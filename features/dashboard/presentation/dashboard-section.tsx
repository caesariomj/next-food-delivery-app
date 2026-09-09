import PageBreadcrumb from "@/components/common/navigation/page-breadcrumb";

export default function DashboardSection() {
  return (
    <>
      <section className="flex h-full min-h-[calc(100vh-4.5rem)] flex-col divide-y-4 divide-foreground">
        <div className="space-y-4 p-4 md:p-8">
          <h1 className="font-display text-6xl font-bold tracking-wide md:text-7xl">
            Dashboard
          </h1>
          <PageBreadcrumb />
        </div>
      </section>
      {/* TODO: Add other dashboard child components here */}
    </>
  );
}
