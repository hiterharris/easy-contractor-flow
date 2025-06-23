import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, User, Clock, Calendar, Plus } from "lucide-react";
import { teamMembers as initialTeamMembers } from "@/lib/data";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Employee"
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInviteMember = () => {
    if (newMember.name && newMember.email) {
      const member = {
        id: teamMembers.length + 1,
        ...newMember,
        status: "pending" as const,
        joinDate: new Date().toISOString().split('T')[0],
        hoursThisWeek: 0,
        currentJob: ""
      };
      setTeamMembers([...teamMembers, member]);
      setNewMember({ name: "", email: "", phone: "", role: "Employee" });
      setIsDialogOpen(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Owner":
        return "bg-purple-100 text-purple-800";
      case "Admin":
        return "bg-blue-100 text-blue-800";
      case "Employee":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team</h1>
            <p className="text-gray-600">Manage your crew and permissions</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to a new team member via email.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="(555) 123-4567"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={newMember.role} onValueChange={(value) => setNewMember({ ...newMember, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Employee">Employee</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button onClick={handleInviteMember} className="flex-1">
                    Send Invitation
                  </Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Team Members</p>
                  <p className="text-2xl font-bold">{teamMembers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold">
                    {teamMembers.filter(m => m.status === "active").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Hours This Week</p>
                  <p className="text-2xl font-bold">
                    {teamMembers.reduce((total, member) => total + member.hoursThisWeek, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">On Jobs Today</p>
                  <p className="text-2xl font-bold">
                    {teamMembers.filter(m => m.currentJob).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Member List */}
        <Card>
          <CardHeader>
            <CardTitle>Team Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-lg">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                          <Badge className={getRoleColor(member.role)}>
                            {member.role}
                          </Badge>
                          <Badge className={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>📧 {member.email}</p>
                          <p>📞 {member.phone}</p>
                          <p>📅 Joined {new Date(member.joinDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">{member.hoursThisWeek}h this week</p>
                        {member.currentJob && (
                          <p className="text-gray-600">Currently: {member.currentJob}</p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Schedule
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Role Permissions Info */}
        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-purple-100 text-purple-800">Owner</Badge>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Full system access</li>
                  <li>• Manage billing & subscription</li>
                  <li>• Delete organization</li>
                  <li>• All admin permissions</li>
                </ul>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-100 text-blue-800">Admin</Badge>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Manage customers & jobs</li>
                  <li>• Invite team members</li>
                  <li>• View all time tracking</li>
                  <li>• Assign jobs to crew</li>
                </ul>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800">Employee</Badge>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Clock in/out on jobs</li>
                  <li>• View assigned jobs</li>
                  <li>• Update job status</li>
                  <li>• View own time tracking</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Team;
