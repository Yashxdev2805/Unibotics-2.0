"use client";

import { useState } from "react";
import { grantUserRole, revokeUserMembership } from "./actions";
import { Shield, ShieldAlert, User, Trash2, Plus, Check } from "lucide-react";

export interface UserRow {
  id: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
  memberships: Array<{
    id: string;
    role: "super_admin" | "team_member" | "institute_admin" | "student";
    approved: boolean;
    institute_id: string | null;
  }>;
}

interface Props {
  users: UserRow[];
}

export default function UsersTable({ users }: Props) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<"super_admin" | "team_member" | "institute_admin">("team_member");
  const [isGranting, setIsGranting] = useState(false);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const handleGrant = async (userId: string) => {
    setIsGranting(true);
    try {
      await grantUserRole(userId, selectedRole);
      setSelectedUserId(null);
    } catch (err) {
      alert("Role grant failed: " + (err as Error).message);
    } finally {
      setIsGranting(false);
    }
  };

  const handleRevoke = async (membershipId: string, roleName: string) => {
    if (!confirm(`Are you certain you wish to revoke ${roleName} privileges?`)) {
      return;
    }
    setRevokingId(membershipId);
    try {
      await revokeUserMembership(membershipId, roleName);
    } catch (err) {
      alert("Revoke failed: " + (err as Error).message);
    } finally {
      setRevokingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-950 border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
              <th className="p-3">User Profile</th>
              <th className="p-3">User Identifier</th>
              <th className="p-3">Registered Date</th>
              <th className="p-3">Active Roles & Authorizations</th>
              <th className="p-3 text-right">Access Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 font-mono">
                  No registered profiles found in database.
                </td>
              </tr>
            ) : (
              users.map((u) => {
                const isAdding = selectedUserId === u.id;

                return (
                  <tr key={u.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3">
                      <span className="font-bold text-white block">
                        {u.full_name || "Unnamed Student / User"}
                      </span>
                      {u.phone && <span className="text-slate-400 font-mono text-[11px]">{u.phone}</span>}
                    </td>

                    <td className="p-3 font-mono text-[11px] text-slate-400">{u.id}</td>

                    <td className="p-3 font-mono text-slate-400 whitespace-nowrap">
                      {new Date(u.created_at).toLocaleDateString("en-IN")}
                    </td>

                    {/* Roles Badges */}
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1.5">
                        {u.memberships.map((m) => (
                          <div
                            key={m.id}
                            className={`inline-flex items-center space-x-1.5 px-2 py-0.5 text-[10px] font-mono font-bold uppercase border ${
                              m.role === "super_admin"
                                ? "bg-red-950/80 text-red-300 border-red-800"
                                : m.role === "team_member"
                                ? "bg-teal-950/80 text-teal-300 border-teal-800"
                                : m.role === "institute_admin"
                                ? "bg-blue-950/80 text-blue-300 border-blue-800"
                                : "bg-slate-800 text-slate-300 border-slate-700"
                            }`}
                          >
                            <span>{m.role}</span>
                            {m.approved ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <span className="text-amber-400 text-[9px]">(Pending)</span>
                            )}
                            {/* Revoke Button */}
                            <button
                              type="button"
                              disabled={revokingId === m.id}
                              onClick={() => handleRevoke(m.id, m.role)}
                              className="ml-1 text-slate-500 hover:text-red-400 transition-colors"
                              title="Revoke this role"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Grant Role Controls */}
                    <td className="p-3 text-right whitespace-nowrap">
                      {isAdding ? (
                        <div className="inline-flex items-center space-x-1 bg-slate-900 border border-slate-700 p-1">
                          <select
                            value={selectedRole}
                            onChange={(e) =>
                              setSelectedRole(
                                e.target.value as "super_admin" | "team_member" | "institute_admin"
                              )
                            }
                            className="bg-slate-800 text-white text-[11px] font-mono px-2 py-1 border border-slate-700 focus:outline-none"
                          >
                            <option value="team_member">Team Member</option>
                            <option value="institute_admin">Institute Admin</option>
                            <option value="super_admin">Super Admin</option>
                          </select>
                          <button
                            type="button"
                            disabled={isGranting}
                            onClick={() => handleGrant(u.id)}
                            className="px-2 py-1 bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-[11px] uppercase transition-colors disabled:opacity-50"
                          >
                            {isGranting ? "..." : "Save"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedUserId(null)}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 text-[11px] transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedUserId(u.id)}
                          className="inline-flex items-center space-x-1 px-2.5 py-1 text-[11px] font-semibold text-slate-300 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-teal-400" />
                          <span>Grant Role</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
