import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Article } from "@shared/schema";

export default function EducationArticles() {
  const { data: articles, isLoading, error } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-6">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-full mb-3" />
              <Skeleton className="h-16 w-full mb-4" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Failed to load articles. Please try again later.</p>
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    solar: "bg-energy-amber text-white",
    battery: "bg-blue-500 text-white",
    heat_pump: "bg-red-500 text-white",
    ev_charger: "bg-green-500 text-white",
    general: "bg-gray-500 text-white",
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles?.map((article) => (
        <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-shadow">
          <img 
            src={article.imageUrl || "https://images.unsplash.com/photo-1509391366360-2e959784a276"} 
            alt={article.title} 
            className="w-full h-48 object-cover" 
          />
          <CardContent className="p-6">
            <Badge 
              className={`${categoryColors[article.category] || categoryColors.general} mb-2`}
            >
              {article.category.replace('_', ' ').toUpperCase()}
            </Badge>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{article.title}</h3>
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <a 
              href={`#article-${article.slug}`} 
              className="text-energy-green font-semibold hover:text-energy-dark transition-colors"
            >
              Read More →
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
