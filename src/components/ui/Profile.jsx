import React from "react";
import { User2 } from "lucide-react";

export default function Profile() {
    return (
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FAF6F0] border border-[#EADFCF] flex items-center justify-center text-[#8C7A6B]">
                <User2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-bold text-[#2B2118]">Nama Pengguna</span>
                <span className="text-[11px] text-[#8C7A6B]">Role Pengguna</span>
            </div>
        </div>
    );
}