// 'use client';

// import {RouteGuard} from '@/components/guards/RouteGuard';
// import {Navbar} from '@/components/layout/Navbar';
// import {EmployeeSidebar} from '@/components/layout/EmployeeSidebar';

// export default function EmployeeLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <RouteGuard allowedRoles={['employee']}>
//       <div className="flex h-screen bg-gray-100">
//         <EmployeeSidebar />
//         <div className="flex flex-1 flex-col overflow-hidden">
//           <Navbar />
//           <main className="flex-1 overflow-y-auto p-6">
//             {children}
//           </main>
//         </div>
//       </div>
//     </RouteGuard>
//   );
// }
//--------------------------------------------------------------------------------

// 'use client';

// import { RouteGuard } from '@/components/guards/RouteGuard';
// import { Navbar } from '@/components/layout/Navbar';
// import { EmployeeSidebar } from '@/components/layout/EmployeeSidebar';

// export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <RouteGuard allowedRoles={['employee']}>
//       <div className="flex h-screen bg-gray-100">
//         <EmployeeSidebar />
//         <div className="flex flex-1 flex-col overflow-hidden">
//           <Navbar />
//           <main className="flex-1 overflow-y-auto p-6">{children}</main>
//         </div>
//       </div>
//     </RouteGuard>
//   );
// }

'use client';


import { Navbar } from '@/components/layout/Navbar';
import { EmployeeSidebar } from '@/components/layout/EmployeeSidebar';

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return (
    
      <div className="flex h-screen bg-gray-100">
        <EmployeeSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
   
  );
}