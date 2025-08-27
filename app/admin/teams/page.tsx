'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Plus, 
  Users, 
  User, 
  Building2, 
  FolderOpen,
  Crown
} from 'lucide-react';
import { mockTeams, getEmployeesByIds, mockProjects } from '@/lib/data';

export default function TeamsPage() {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const teamStats = {
    total: mockTeams.length,
    totalMembers: mockTeams.reduce((sum, team) => sum + team.members.length, 0),
    departments: new Set(mockTeams.map(team => team.department)).size,
    avgSize: Math.round(mockTeams.reduce((sum, team) => sum + team.members.length, 0) / mockTeams.length),
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
          <p className="text-gray-600">Organize and manage team structures</p>
        </div>
        <Button className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Create Team
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{teamStats.total}</div>
              <div className="text-sm text-gray-600">Total Teams</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{teamStats.totalMembers}</div>
              <div className="text-sm text-gray-600">Total Members</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{teamStats.departments}</div>
              <div className="text-sm text-gray-600">Departments</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{teamStats.avgSize}</div>
              <div className="text-sm text-gray-600">Avg Team Size</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockTeams.map((team) => {
          const teamMembers = getEmployeesByIds(team.members);
          const teamProjects = mockProjects.filter(project => 
            team.projects.includes(project.id)
          );
          
          return (
            <Card key={team.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                  </div>
                  <Badge variant="outline">
                    <Building2 className="mr-1 h-3 w-3" />
                    {team.department}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Team Lead */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Crown className="mr-1 h-3 w-3" />
                    <span>Team Lead</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-sm">{team.lead}</span>
                  </div>
                </div>
                
                {/* Team Members */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      <span>Members</span>
                    </div>
                    <span className="font-medium">{teamMembers.length}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {teamMembers.slice(0, 4).map((member) => (
                        <Avatar key={member.id} className="h-8 w-8 border-2 border-white">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="text-xs">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {teamMembers.length > 4 && (
                        <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            +{teamMembers.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Member names */}
                  <div className="text-xs text-gray-500">
                    {teamMembers.slice(0, 3).map(member => member.name).join(', ')}
                    {teamMembers.length > 3 && ` +${teamMembers.length - 3} more`}
                  </div>
                </div>
                
                {/* Projects */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <FolderOpen className="mr-1 h-3 w-3" />
                      <span>Active Projects</span>
                    </div>
                    <span className="font-medium">{teamProjects.length}</span>
                  </div>
                  
                  {teamProjects.length > 0 && (
                    <div className="space-y-1">
                      {teamProjects.slice(0, 2).map((project) => (
                        <div key={project.id} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                          {project.name}
                        </div>
                      ))}
                      {teamProjects.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{teamProjects.length - 2} more projects
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Team
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {mockTeams.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No teams found</h3>
            <p className="text-gray-600 mb-4">Start organizing your workforce by creating teams.</p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}