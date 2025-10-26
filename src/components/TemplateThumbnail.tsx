'use client';

import { Template } from '@/types/template';

interface TemplateThumbnailProps {
  template: Template;
  size?: 'small' | 'large';
}

export default function TemplateThumbnail({ template, size = 'small' }: TemplateThumbnailProps) {
  const dimensions = size === 'small' ? { width: 400, height: 300 } : { width: 800, height: 600 };
  
  const generateThumbnail = () => {
    switch (template.id) {
      case 'cv_moderne':
        return (
          <div className="w-full h-full bg-white p-4 border border-gray-200 rounded">
            {/* Header with photo placeholder */}
            <div className="flex items-center mb-4 pb-2 border-b-2 border-blue-500">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-blue-600 rounded mb-1 w-32"></div>
                <div className="h-3 bg-gray-400 rounded w-24"></div>
              </div>
            </div>
            
            {/* Contact info */}
            <div className="flex gap-2 mb-4 text-xs">
              <div className="h-3 bg-gray-300 rounded w-20"></div>
              <div className="h-3 bg-gray-300 rounded w-16"></div>
              <div className="h-3 bg-gray-300 rounded w-14"></div>
            </div>
            
            {/* Summary section */}
            <div className="mb-3">
              <div className="h-3 bg-blue-600 rounded mb-2 w-16"></div>
              <div className="space-y-1">
                <div className="h-2 bg-gray-200 rounded w-full"></div>
                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
            
            {/* Experience section */}
            <div>
              <div className="h-3 bg-blue-600 rounded mb-2 w-20"></div>
              <div className="space-y-1">
                <div className="h-2 bg-gray-200 rounded w-full"></div>
                <div className="h-2 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        );
        
      case 'lettre_motivation':
        return (
          <div className="w-full h-full bg-white p-6 border border-gray-200 rounded">
            {/* Letter header */}
            <div className="flex justify-between mb-6 pb-4 border-b border-gray-300">
              <div>
                <div className="h-3 bg-gray-700 rounded mb-1 w-24"></div>
                <div className="h-2 bg-gray-400 rounded w-20"></div>
                <div className="h-2 bg-gray-400 rounded w-16"></div>
              </div>
              <div className="h-3 bg-gray-400 rounded w-12"></div>
            </div>
            
            {/* Recipient info */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4">
              <div className="h-3 bg-gray-700 rounded mb-1 w-20"></div>
              <div className="h-2 bg-gray-600 rounded w-16"></div>
            </div>
            
            {/* Letter content */}
            <div className="text-center mb-4">
              <div className="h-4 bg-blue-600 rounded mx-auto w-32 mb-2"></div>
              <div className="h-3 bg-gray-600 rounded mx-auto w-40"></div>
            </div>
            
            {/* Body text */}
            <div className="space-y-2 text-sm">
              <div className="h-2 bg-gray-200 rounded w-full"></div>
              <div className="h-2 bg-gray-200 rounded w-5/6"></div>
              <div className="h-2 bg-gray-200 rounded w-full"></div>
              <div className="h-2 bg-gray-200 rounded w-4/5"></div>
            </div>
            
            {/* Motivation section */}
            <div className="bg-gray-50 p-3 mt-4 rounded">
              <div className="h-3 bg-blue-600 rounded mb-2 w-24"></div>
              <div className="space-y-1">
                <div className="h-2 bg-gray-300 rounded w-full"></div>
                <div className="h-2 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        );
        
      case 'facture_pro':
        return (
          <div className="w-full h-full bg-white p-4 border border-gray-200 rounded">
            {/* Invoice header */}
            <div className="flex justify-between items-start mb-4 pb-3 border-b-2 border-blue-500">
              <div>
                <div className="h-4 bg-blue-600 rounded mb-1 w-28"></div>
                <div className="h-2 bg-gray-400 rounded w-20"></div>
              </div>
              <div className="text-right">
                <div className="h-5 bg-blue-600 rounded mb-2 w-16"></div>
                <div className="space-y-1">
                  <div className="h-2 bg-gray-400 rounded w-14"></div>
                  <div className="h-2 bg-gray-400 rounded w-12"></div>
                  <div className="h-2 bg-gray-400 rounded w-10"></div>
                </div>
              </div>
            </div>
            
            {/* Client info */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4">
              <div className="h-3 bg-gray-700 rounded mb-1 w-12"></div>
              <div className="h-2 bg-gray-600 rounded w-20"></div>
              <div className="h-2 bg-gray-600 rounded w-16"></div>
            </div>
            
            {/* Services section */}
            <div className="mb-4">
              <div className="h-3 bg-blue-600 rounded mb-2 w-16"></div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="space-y-1">
                  <div className="h-2 bg-gray-300 rounded w-full"></div>
                  <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-2 bg-gray-300 rounded w-4/5"></div>
                </div>
              </div>
            </div>
            
            {/* Amounts */}
            <div className="bg-gray-50 p-3 rounded">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-2 bg-gray-600 rounded w-16"></div>
                  <div className="h-2 bg-gray-700 rounded w-12"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-2 bg-gray-600 rounded w-8"></div>
                  <div className="h-2 bg-gray-700 rounded w-10"></div>
                </div>
                <div className="flex justify-between pt-2 border-t border-blue-500">
                  <div className="h-3 bg-blue-600 rounded w-16"></div>
                  <div className="h-3 bg-blue-600 rounded w-14"></div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'attestation_travail':
        return (
          <div className="w-full h-full bg-white p-6 border border-gray-200 rounded">
            {/* Header */}
            <div className="text-center mb-6 pb-4 border-b-2 border-blue-500">
              <div className="h-4 bg-blue-600 rounded mx-auto w-32 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded mx-auto w-40"></div>
              <div className="h-2 bg-gray-400 rounded mx-auto w-24"></div>
            </div>
            
            {/* Date */}
            <div className="mb-4">
              <div className="h-2 bg-gray-600 rounded w-16"></div>
            </div>
            
            {/* Main content */}
            <div className="space-y-3 mb-4">
              <div className="h-2 bg-gray-200 rounded w-full"></div>
              <div className="h-2 bg-gray-200 rounded w-5/6"></div>
              <div className="h-2 bg-gray-200 rounded w-full"></div>
            </div>
            
            {/* Employee info */}
            <div className="bg-blue-50 p-3 mb-4 rounded">
              <div className="h-3 bg-gray-700 rounded mb-2 w-24"></div>
              <div className="space-y-1">
                <div className="h-2 bg-gray-600 rounded w-full"></div>
                <div className="h-2 bg-gray-600 rounded w-5/6"></div>
              </div>
            </div>
            
            {/* Details list */}
            <div className="mb-4">
              <div className="h-3 bg-gray-700 rounded mb-2 w-28"></div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="h-2 bg-gray-300 rounded w-3/5"></div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-300">
              <div className="h-2 bg-gray-600 rounded mx-auto w-32 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded mx-auto w-36"></div>
            </div>
          </div>
        );
        
      case 'demande_conge':
        return (
          <div className="w-full h-full bg-white p-4 border border-gray-200 rounded">
            {/* Header */}
            <div className="text-center mb-4 pb-3 border-b-2 border-blue-500">
              <div className="h-4 bg-blue-600 rounded mx-auto w-28"></div>
            </div>
            
            {/* Employee info section */}
            <div className="mb-4">
              <div className="h-3 bg-blue-600 rounded mb-2 w-32"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 p-2 rounded">
                  <div className="h-2 bg-gray-600 rounded w-12 mb-1"></div>
                  <div className="h-2 bg-gray-300 rounded w-full"></div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="h-2 bg-gray-600 rounded w-8 mb-1"></div>
                  <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="h-2 bg-gray-600 rounded w-14 mb-1"></div>
                  <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="h-2 bg-gray-600 rounded w-10 mb-1"></div>
                  <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            </div>
            
            {/* Leave details */}
            <div className="mb-4">
              <div className="h-3 bg-blue-600 rounded mb-2 w-24"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 p-2 rounded">
                  <div className="h-2 bg-gray-600 rounded w-16 mb-1"></div>
                  <div className="h-2 bg-gray-300 rounded w-full"></div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="h-2 bg-gray-600 rounded w-12 mb-1"></div>
                  <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="h-2 bg-gray-600 rounded w-14 mb-1"></div>
                  <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="h-2 bg-gray-600 rounded w-10 mb-1"></div>
                  <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            </div>
            
            {/* Reason section */}
            <div className="bg-gray-50 p-3 mb-4 rounded">
              <div className="h-2 bg-gray-600 rounded w-8 mb-2"></div>
              <div className="space-y-1">
                <div className="h-2 bg-gray-300 rounded w-full"></div>
                <div className="h-2 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
            
            {/* Signature area */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="h-2 bg-gray-600 rounded w-20 mb-2"></div>
                <div className="border-b border-gray-400 h-6"></div>
              </div>
              <div className="text-center">
                <div className="h-2 bg-gray-600 rounded w-24 mb-2"></div>
                <div className="border-b border-gray-400 h-6"></div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center border border-gray-200 rounded">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-300 rounded mx-auto mb-2"></div>
              <p className="text-sm">Aperçu non disponible</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full overflow-hidden">
      {generateThumbnail()}
    </div>
  );
}