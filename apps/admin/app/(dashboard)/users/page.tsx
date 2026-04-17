import { UsersTable } from "@/components/users/users-table";
import { UsersStats } from "@/components/users/users-stats";

export default function UsersPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
                    <p className="text-muted-foreground">
                        Quản lý tất cả người dùng trong hệ thống E-learning
                    </p>
                </div>
            </div>

            {/* Stats */}
            <UsersStats />

            {/* Table */}
            <UsersTable />
        </div>
    );
}
