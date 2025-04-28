import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { Separator } from "@/components/ui/separator.tsx";

const breadcrumbNameMap: Record<string, string> = {
  "/Dashboard": "Dashboard",
  "/UploadFile": "Upload File",
  "/Search": "Search",
  "/Report": "Reports",
  "/CreateAccount": "Create Account",
  "/TestPage": "Test Page",
  "/report/intake-reporting": "Intake Reporting",
  "/report/flow-through": "Flow Through",
  "/report/loss-of-service": "Loss of Service",
  "/report/rent-supplement-request": "Rent Supplement",
  "/report/goals-and-progress": "Goals & Progress",
  "/report/safety-plan": "Safety Plan",
  "/report/overdose-safety-plan": "Overdose Safety",
  "/report/incident-report": "Incident Report",
  "/report/individuals": "Individuals",
  "/report/shelter-diversion-follow-up-log": "Shelter Diversion",
  "/report/site-list": "Site List",
};

export const Header = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);


  return (
    <header className="p-4 w-full border-b bg-white dark:bg-neutral-950 px-6 shadow-sm flex items-center justify-between">
      {/* 左边：侧边栏按钮 + 面包屑 */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-6" />
        <Breadcrumb>
          <BreadcrumbList>
            {pathnames.length === 0 ? (
              <BreadcrumbItem>
                <BreadcrumbPage className="text-base font-medium">
                  Home
                </BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              pathnames.map((segment, index) => {
                const url = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;
                const label = breadcrumbNameMap[url] || segment;

                return (
                  <React.Fragment key={url}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="text-base font-medium">
                          {label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link
                            to={url}
                            className="text-sm text-muted-foreground hover:underline"
                          >
                            {label}
                          </Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                );
              })
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* 右边（预留按钮/头像区域） */}
      <div className="flex items-center gap-4">
        {/* 放头像、通知铃铛、设置按钮之类 */}
        {/* <UserAvatar /> */}
      </div>
    </header>
  );
};
