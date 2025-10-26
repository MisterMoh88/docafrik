'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Template } from '@/types/template';
import { Star, Eye, Download, Heart, Share2, FileText, Zap, Crown } from 'lucide-react';
import TemplateThumbnail from './TemplateThumbnail';

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
  onPreview?: (template: Template) => void;
  showActions?: boolean;
  variant?: 'grid' | 'list';
}

export default function TemplateCard({ 
  template, 
  onSelect, 
  onPreview, 
  showActions = true,
  variant = 'grid' 
}: TemplateCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: template.name,
        text: template.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      professionnels: 'bg-blue-100 text-blue-800',
      administratifs: 'bg-green-100 text-green-800',
      commerciaux: 'bg-purple-100 text-purple-800',
      academiques: 'bg-orange-100 text-orange-800',
      personnels: 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 shadow-md overflow-hidden ${
      variant === 'list' ? 'flex' : ''
    } bg-white`}>
      <div className={variant === 'list' ? 'flex-1 flex' : ''}>
        {/* Thumbnail */}
        <div className={`relative overflow-hidden ${
          variant === 'list' ? 'w-48 h-32' : 'h-64'
        } bg-gradient-to-br from-gray-50 to-gray-100`}>
          <TemplateThumbnail template={template} size={variant === 'list' ? 'small' : 'small'} />
          
          {/* Popular Badge for high usage templates */}
          {template.usageCount > 1000 && (
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
              POPULAIRE
            </div>
          )}
          
          {/* Premium Badge */}
          {template.isPremium && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
              PREMIUM
            </div>
          )}

          {/* User count overlay */}
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
            {template.usageCount > 1000000 
              ? `${(template.usageCount / 1000000).toFixed(1)}M+ utilisateurs`
              : `${template.usageCount.toLocaleString()} utilisateurs`
            }
          </div>

          {/* Actions overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            {onPreview && (
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview(template);
                }}
                className="bg-white/90 hover:bg-white text-gray-900 font-medium"
              >
                <Eye className="w-4 h-4 mr-1" />
                Aperçu
              </Button>
            )}
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(template);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Utiliser ce modèle
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 p-6 ${variant === 'list' ? 'flex flex-col justify-between' : ''}`}>
          <div>
            <div className="flex items-start justify-between mb-3">
              <CardTitle className="text-xl font-bold text-gray-900 line-clamp-1">
                {template.name}
              </CardTitle>
              <div className="flex items-center gap-1 ml-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-600">{template.rating}</span>
              </div>
            </div>
            
            <CardDescription className="text-gray-600 mb-4 line-clamp-2 text-sm">
              {template.description}
            </CardDescription>

            {/* Special callout for popular templates */}
            {template.usageCount > 1000 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-green-800 text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {template.usageCount > 1000000 
                    ? `${(template.usageCount / 1000000).toFixed(1)}M+ utilisateurs ont choisi ce modèle`
                    : `${template.usageCount.toLocaleString()} utilisateurs ont choisi ce modèle`
                  }
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {template.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200">
                  {tag}
                </Badge>
              ))}
              {template.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                  +{template.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Features */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>{template.fields.length} champs</span>
              <span>•</span>
              <span>Professionnel</span>
              <span>•</span>
              <span>PDF & Word</span>
            </div>
          </div>

          {showActions && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`p-2 h-8 rounded-full ${isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="p-2 h-8 rounded-full text-gray-400 hover:text-gray-600"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
              
              <Button
                size="sm"
                onClick={() => onSelect(template)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4"
              >
                {variant === 'list' ? 'Utiliser' : 'Utiliser'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}