import { Octokit } from '@octokit/rest';
import { execSync } from 'child_process';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function main() {
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });
  
  const { data: user } = await octokit.users.getAuthenticated();
  console.log(`Authenticated as: ${user.login}`);
  
  const repoName = 'mediconnect-lab-platform';
  console.log(`Creating repository: ${repoName}...`);
  
  try {
    const { data: repo } = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      description: 'MediConnect - AI-powered lab test discovery and booking platform for Dubai/UAE',
      private: false,
      auto_init: false
    });
    console.log(`Repository created: ${repo.html_url}`);
  } catch (error: any) {
    if (error.status === 422) {
      console.log('Repository already exists, will push to it...');
    } else {
      throw error;
    }
  }
  
  const remoteUrl = `https://${accessToken}@github.com/${user.login}/${repoName}.git`;
  
  execSync('git config user.email "replit@users.noreply.github.com"', { stdio: 'inherit' });
  execSync('git config user.name "Replit Agent"', { stdio: 'inherit' });
  
  try {
    execSync('git remote remove origin', { stdio: 'pipe' });
  } catch (e) {}
  
  execSync(`git remote add origin ${remoteUrl}`, { stdio: 'inherit' });
  execSync('git branch -M main', { stdio: 'inherit' });
  execSync('git push -u origin main --force', { stdio: 'inherit' });
  
  console.log(`\n✅ Code pushed successfully!`);
  console.log(`Repository URL: https://github.com/${user.login}/${repoName}`);
}

main().catch(console.error);
