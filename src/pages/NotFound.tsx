
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-red-50 p-4">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-water-dark mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
          Water flows in many directions, but this path leads nowhere.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default" className="bg-water-dark hover:bg-water-dark/90">
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="border-water-dark text-water-dark">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
