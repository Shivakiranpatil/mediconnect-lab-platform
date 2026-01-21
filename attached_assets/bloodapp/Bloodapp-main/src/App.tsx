import { Home } from "./components/Home";
import { Discover } from "./components/Discover";
import { BundlesPage } from "./components/BundlesPage";
import { BundleDetail } from "./components/BundleDetail";
import { TestDetail } from "./components/TestDetail";
import { BloodSugarInfo } from "./components/BloodSugarInfo";
import { useState } from "react";

type Page =
  | { name: "home" }
  | { name: "discover" }
  | { name: "bundles" }
  | { name: "bundle-detail"; bundleId: string }
  | { name: "test-detail"; testId: string }
  | { name: "blood-sugar-info" };

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>({
    name: "home",
  });

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  // Render appropriate page
  if (currentPage.name === "discover") {
    return <Discover onNavigate={navigate} />;
  }

  if (currentPage.name === "bundles") {
    return <BundlesPage onNavigate={navigate} />;
  }

  if (currentPage.name === "bundle-detail") {
    return (
      <BundleDetail
        bundleId={currentPage.bundleId}
        onNavigate={navigate}
      />
    );
  }

  if (currentPage.name === "test-detail") {
    return (
      <TestDetail
        testId={currentPage.testId}
        onNavigate={navigate}
      />
    );
  }

  if (currentPage.name === "blood-sugar-info") {
    return <BloodSugarInfo onNavigate={navigate} />;
  }

  return <Home onNavigate={navigate} />;
}