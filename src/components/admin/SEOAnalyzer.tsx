import { useMemo } from 'react';
import { CheckCircle, XCircle, AlertCircle, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface SEOAnalyzerProps {
  title: string;
  metaDescription?: string;
  content: string;
  images: { alt?: string }[];
  slug: string;
}

interface SEOCheck {
  label: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

export function SEOAnalyzer({ title, metaDescription, content, images, slug }: SEOAnalyzerProps) {
  const analysis = useMemo(() => {
    const checks: SEOCheck[] = [];
    let score = 0;
    const maxScore = 100;

    // Title length check (50-60 chars ideal)
    const titleLength = title.length;
    if (titleLength >= 50 && titleLength <= 60) {
      checks.push({ label: 'Title Length', status: 'pass', message: `Perfect! ${titleLength} characters.` });
      score += 15;
    } else if (titleLength >= 30 && titleLength < 50) {
      checks.push({ label: 'Title Length', status: 'warning', message: `${titleLength} chars. Aim for 50-60.` });
      score += 10;
    } else if (titleLength > 60) {
      checks.push({ label: 'Title Length', status: 'warning', message: `${titleLength} chars. May be truncated in search results.` });
      score += 8;
    } else {
      checks.push({ label: 'Title Length', status: 'fail', message: `${titleLength} chars. Too short!` });
      score += 0;
    }

    // Meta description check (150-160 chars ideal)
    const descLength = metaDescription?.length || 0;
    if (descLength >= 150 && descLength <= 160) {
      checks.push({ label: 'Meta Description', status: 'pass', message: `Perfect! ${descLength} characters.` });
      score += 15;
    } else if (descLength >= 120 && descLength < 150) {
      checks.push({ label: 'Meta Description', status: 'warning', message: `${descLength} chars. Aim for 150-160.` });
      score += 10;
    } else if (descLength > 160) {
      checks.push({ label: 'Meta Description', status: 'warning', message: `${descLength} chars. May be truncated.` });
      score += 8;
    } else if (descLength > 0) {
      checks.push({ label: 'Meta Description', status: 'fail', message: `${descLength} chars. Too short!` });
      score += 5;
    } else {
      checks.push({ label: 'Meta Description', status: 'fail', message: 'Missing! Add a meta description.' });
      score += 0;
    }

    // Word count (300+ words recommended)
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    if (wordCount >= 1000) {
      checks.push({ label: 'Content Length', status: 'pass', message: `Excellent! ${wordCount} words.` });
      score += 20;
    } else if (wordCount >= 300) {
      checks.push({ label: 'Content Length', status: 'pass', message: `Good! ${wordCount} words.` });
      score += 15;
    } else if (wordCount >= 100) {
      checks.push({ label: 'Content Length', status: 'warning', message: `${wordCount} words. Aim for 300+.` });
      score += 8;
    } else {
      checks.push({ label: 'Content Length', status: 'fail', message: `Only ${wordCount} words. Need more content!` });
      score += 0;
    }

    // URL/Slug check
    const slugValid = /^[a-z0-9-]+$/.test(slug) && slug.length < 60;
    if (slugValid && slug.length > 0) {
      checks.push({ label: 'URL Slug', status: 'pass', message: 'Clean, SEO-friendly URL.' });
      score += 15;
    } else if (slug.length > 60) {
      checks.push({ label: 'URL Slug', status: 'warning', message: 'URL is too long. Keep under 60 chars.' });
      score += 8;
    } else if (!slug) {
      checks.push({ label: 'URL Slug', status: 'fail', message: 'Missing URL slug!' });
      score += 0;
    } else {
      checks.push({ label: 'URL Slug', status: 'warning', message: 'URL contains invalid characters.' });
      score += 5;
    }

    // Image alt text check
    const imagesWithAlt = images.filter(img => img.alt && img.alt.length > 0).length;
    const totalImages = images.length;
    if (totalImages === 0) {
      checks.push({ label: 'Images', status: 'warning', message: 'No images. Consider adding visuals.' });
      score += 10;
    } else if (imagesWithAlt === totalImages) {
      checks.push({ label: 'Image Alt Text', status: 'pass', message: `All ${totalImages} images have alt text.` });
      score += 15;
    } else if (imagesWithAlt > 0) {
      checks.push({ label: 'Image Alt Text', status: 'warning', message: `${imagesWithAlt}/${totalImages} images have alt text.` });
      score += 8;
    } else {
      checks.push({ label: 'Image Alt Text', status: 'fail', message: 'No images have alt text!' });
      score += 0;
    }

    // Readability (Flesch-Kincaid approximation)
    const sentences = content.split(/[.!?]+/).filter(Boolean).length;
    const avgWordsPerSentence = sentences > 0 ? wordCount / sentences : 0;
    if (avgWordsPerSentence >= 10 && avgWordsPerSentence <= 20) {
      checks.push({ label: 'Readability', status: 'pass', message: 'Good sentence length for readability.' });
      score += 10;
    } else if (avgWordsPerSentence < 10) {
      checks.push({ label: 'Readability', status: 'warning', message: 'Sentences are very short. Consider varying length.' });
      score += 5;
    } else {
      checks.push({ label: 'Readability', status: 'warning', message: 'Sentences are long. Consider breaking them up.' });
      score += 5;
    }

    // Internal/External links (simplified)
    const hasLinks = content.includes('http') || content.includes('href');
    if (hasLinks) {
      checks.push({ label: 'Links', status: 'pass', message: 'Content includes links.' });
      score += 10;
    } else {
      checks.push({ label: 'Links', status: 'warning', message: 'No links found. Add internal/external links.' });
      score += 5;
    }

    return { checks, score: Math.min(score, maxScore) };
  }, [title, metaDescription, content, images, slug]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getStatusIcon = (status: SEOCheck['status']) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'fail': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="glass-card p-4 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          <h3 className="font-semibold">SEO Score</h3>
        </div>
        <span className={`text-2xl font-bold ${getScoreColor(analysis.score)}`}>
          {analysis.score}%
        </span>
      </div>

      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`absolute inset-y-0 left-0 ${getProgressColor(analysis.score)} transition-all`}
          style={{ width: `${analysis.score}%` }}
        />
      </div>

      <div className="space-y-2">
        {analysis.checks.map((check, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            {getStatusIcon(check.status)}
            <div>
              <span className="font-medium">{check.label}:</span>{' '}
              <span className="text-muted-foreground">{check.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
