
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Home, Settings as SettingsIcon, Shield, LogIn, User, AlertCircle, Eye, EyeOff, KeyRound, Users, History } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const SecuritySettings = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [passwordResetRequired, setPasswordResetRequired] = useState(false);
  const [autoLogout, setAutoLogout] = useState(true);
  const [receiveAlerts, setReceiveAlerts] = useState(true);
  
  const passwordStrength = (password) => {
    if (!password) return { text: "None", color: "bg-gray-200" };
    if (password.length < 8) return { text: "Weak", color: "bg-red-500" };
    if (password.length < 12) return { text: "Moderate", color: "bg-yellow-500" };
    if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/)) 
      return { text: "Strong", color: "bg-green-500" };
    return { text: "Good", color: "bg-blue-500" };
  };
  
  const handleSavePassword = (e) => {
    e.preventDefault();
    
    if (!password) {
      toast({
        title: "Current password required",
        description: "Please enter your current password",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully"
    });
    
    // Reset form
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast({
      title: `Two-factor authentication ${twoFactorEnabled ? "disabled" : "enabled"}`,
      description: twoFactorEnabled ? 
        "Your account is now less secure. We recommend enabling two-factor authentication." : 
        "Your account is now more secure with two-factor authentication."
    });
  };
  
  const togglePasswordReset = () => {
    setPasswordResetRequired(!passwordResetRequired);
    toast({
      title: `Password reset requirement ${passwordResetRequired ? "disabled" : "enabled"}`,
      description: passwordResetRequired ? 
        "Users will no longer be required to reset their password periodically." : 
        "Users will now be required to reset their password every 90 days."
    });
  };
  
  const toggleAutoLogout = () => {
    setAutoLogout(!autoLogout);
    toast({
      title: `Auto-logout ${autoLogout ? "disabled" : "enabled"}`,
      description: autoLogout ? 
        "You will remain logged in even after periods of inactivity." : 
        "You will be automatically logged out after 30 minutes of inactivity."
    });
  };
  
  const toggleReceiveAlerts = () => {
    setReceiveAlerts(!receiveAlerts);
    toast({
      title: `Security alerts ${receiveAlerts ? "disabled" : "enabled"}`,
      description: receiveAlerts ? 
        "You will no longer receive notifications about suspicious login attempts." : 
        "You will now receive notifications about suspicious login attempts."
    });
  };
  
  const handleResetSessions = () => {
    toast({
      title: "All sessions terminated",
      description: "You've been logged out of all other devices and sessions."
    });
  };
  
  const strength = passwordStrength(newPassword);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        {!isMobile && <Sidebar />}
        <main className="flex-1 p-4 md:p-6">
          <Breadcrumb className="mb-4 md:mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">
                    <Home className="h-4 w-4 mr-1" />
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/settings">
                    <SettingsIcon className="h-4 w-4 mr-1" />
                    Settings
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink className="flex items-center" href="/settings/security">
                  <Shield className="h-4 w-4 mr-1" />
                  Security
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 text-water-dark">
              Security Settings
            </h1>
            <p className="text-lg text-gray-600">
              Manage your account security and authentication options
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <KeyRound className="h-5 w-5 text-blue-700" />
                  </div>
                  <CardTitle>Password Management</CardTitle>
                </div>
                <CardDescription>
                  Update your password and view strength information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSavePassword} className="space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <Input 
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter current password"
                      />
                      <button 
                        type="button"
                        className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium mb-1">
                      New Password
                    </label>
                    <Input 
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                    
                    {newPassword && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Password Strength</span>
                          <span className="text-xs font-medium">{strength.text}</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full ${strength.color}`} style={{ width: 
                            strength.text === "None" ? "0%" :
                            strength.text === "Weak" ? "25%" :
                            strength.text === "Moderate" ? "50%" :
                            strength.text === "Good" ? "75%" : "100%"
                          }}></div>
                        </div>
                        <div className="mt-2 text-xs text-gray-600">
                          <p>Password should:</p>
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            <li className={newPassword.length >= 8 ? "text-green-600" : ""}>
                              Be at least 8 characters long
                            </li>
                            <li className={newPassword.match(/[A-Z]/) ? "text-green-600" : ""}>
                              Include at least one uppercase letter
                            </li>
                            <li className={newPassword.match(/[0-9]/) ? "text-green-600" : ""}>
                              Include at least one number
                            </li>
                            <li className={newPassword.match(/[^A-Za-z0-9]/) ? "text-green-600" : ""}>
                              Include at least one special character
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
                      Confirm New Password
                    </label>
                    <Input 
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                    {newPassword && confirmPassword && (
                      <p className={`text-xs mt-1 ${newPassword === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                        {newPassword === confirmPassword ? "Passwords match" : "Passwords don't match"}
                      </p>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full">Update Password</Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <Shield className="h-5 w-5 text-amber-700" />
                  </div>
                  <CardTitle>Security Options</CardTitle>
                </div>
                <CardDescription>
                  Configure additional security settings for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">
                      Require a verification code when logging in
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={twoFactorEnabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {twoFactorEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                    <Switch 
                      checked={twoFactorEnabled} 
                      onCheckedChange={toggleTwoFactor}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Require Password Reset</h3>
                    <p className="text-sm text-gray-600">
                      Force password reset every 90 days
                    </p>
                  </div>
                  <Switch 
                    checked={passwordResetRequired} 
                    onCheckedChange={togglePasswordReset}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-Logout After Inactivity</h3>
                    <p className="text-sm text-gray-600">
                      Automatically log out after 30 minutes of inactivity
                    </p>
                  </div>
                  <Switch 
                    checked={autoLogout} 
                    onCheckedChange={toggleAutoLogout}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Suspicious Activity Alerts</h3>
                    <p className="text-sm text-gray-600">
                      Receive notifications about suspicious login attempts
                    </p>
                  </div>
                  <Switch 
                    checked={receiveAlerts} 
                    onCheckedChange={toggleReceiveAlerts}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <History className="h-5 w-5 text-blue-700" />
                  </div>
                  <CardTitle>Active Sessions</CardTitle>
                </div>
                <CardDescription>
                  Manage your active login sessions across devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-100 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <LogIn className="h-4 w-4 text-green-700" />
                      </div>
                      <div>
                        <h3 className="font-medium">Current Session</h3>
                        <p className="text-xs text-gray-600">
                          Chrome on Windows • IP: 192.168.1.1 • Last active: Just now
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Current</Badge>
                  </div>
                  
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <LogIn className="h-4 w-4 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="font-medium">Safari on MacBook Pro</h3>
                        <p className="text-xs text-gray-600">
                          IP: 123.45.67.89 • Last active: Yesterday, 4:30 PM
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Revoke</Button>
                  </div>
                  
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <LogIn className="h-4 w-4 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="font-medium">AquaPure Mobile App</h3>
                        <p className="text-xs text-gray-600">
                          IP: 98.76.54.32 • Last active: 2 days ago
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Revoke</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  onClick={handleResetSessions}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Log Out From All Other Devices
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
      {isMobile && <Sidebar />}
    </div>
  );
};

export default SecuritySettings;
