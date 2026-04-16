import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@workspace/ui/components/sidebar";
import { Separator } from "@workspace/ui/components/separator";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@workspace/ui/components/breadcrumb";
import { SiteHeader } from "@/components/site-header";
import StatisticsBlock from "@/components/shadcn-space/blocks/dashboard-shell/statistics";
import SalesOverviewChart from "@/components/shadcn-space/blocks/dashboard-shell/sales-overview-chart";
import EarningReportChart from "@/components/shadcn-space/blocks/dashboard-shell/earning-report-chart";
import TopProductTable from "@/components/shadcn-space/blocks/dashboard-shell/top-product-table";
import SalesByCountryWidget from "@/components/shadcn-space/blocks/dashboard-shell/salesbycountrywidget";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <SiteHeader />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto w-full">
            <div className="col-span-12">
              <StatisticsBlock />
            </div>
            <div className="xl:col-span-8 col-span-12">
              <SalesOverviewChart />
            </div>
            <div className="xl:col-span-4 col-span-12">
              <EarningReportChart />
            </div>
            <div className="xl:col-span-8 col-span-12">
              <TopProductTable />
            </div>
            <div className="xl:col-span-4 col-span-12">
              <SalesByCountryWidget />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
