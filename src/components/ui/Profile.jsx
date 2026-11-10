import React from "react";
import { User2 } from "lucide-react";

export default function Profile() {
    return (
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-surface-super-admin border border-border-super-admin flex items-center justify-center text-muted-super-admin">
                <User2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-bold text-ink-super-admin">Nama Pengguna</span>
                <span className="text-[11px] text-muted-super-admin">Role Pengguna</span>
            </div>
        </div>
    );
}