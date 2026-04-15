import { Image } from 'astro:assets';

import blogAccessSolutions from '../assets/images/blog/access-solutions.jpg';
import blogAccidentCosts from '../assets/images/blog/accident-costs.jpg';
import blogCantileverSolutions from '../assets/images/blog/cantilever-solutions.jpg';
import blogChoosingRightSystem from '../assets/images/blog/choosing-right-system.jpg';
import blogConstructionSafety from '../assets/images/blog/construction-safety.jpg';
import blogCostsGuide from '../assets/images/blog/costs-guide.jpg';
import blogDifferentTrades from '../assets/images/blog/different-trades.jpg';
import blogDiySafetyGuide from '../assets/images/blog/diy-safety-guide.jpg';
import blogFacadeRestoration from '../assets/images/blog/facade-restoration.jpg';
import blogHeightOptions from '../assets/images/blog/height-options.jpg';
import blogHireCostsCanterbury from '../assets/images/blog/hire-costs-canterbury.jpg';
import blogIndustrialChallenges from '../assets/images/blog/industrial-challenges.jpg';
import blogIndustrialChallenges2 from '../assets/images/blog/industrial-challenges-2.jpg';
import blogInspectionRequirements from '../assets/images/blog/inspection-requirements.jpg';
import blogInsuranceCoverage from '../assets/images/blog/insurance-coverage.jpg';
import blogModificationsProject from '../assets/images/blog/modifications-project.jpg';
import blogResidentialCommercial2 from '../assets/images/blog/residential-commercial-2.jpg';
import blogResidentialVsCommercial from '../assets/images/blog/residential-vs-commercial.jpg';
import blogRoofWork from '../assets/images/blog/roof-work.jpg';
import blogSafetyStandardsNz from '../assets/images/blog/safety-standards-nz.jpg';
import blogSeismicChristchurch from '../assets/images/blog/seismic-christchurch.jpg';
import blogSeismicEngineering from '../assets/images/blog/seismic-engineering.jpg';
import blogSitePreparation from '../assets/images/blog/site-preparation.jpg';
import blogTimelinePlanning from '../assets/images/blog/timeline-planning.jpg';
import blogWeatherManagement from '../assets/images/blog/weather-management.jpg';
import blogWinterPreparation from '../assets/images/blog/winter-preparation.jpg';

import type { ImageMetadata } from 'astro';

export type BlogImageResult = {
  src: ImageMetadata | string;
  isOptimized: boolean;
};

const specificImages: Record<string, ImageMetadata> = {
  '01-scaffolding-safety-standards-nz': blogSafetyStandardsNz,
  '02-residential-vs-commercial-scaffolding': blogResidentialVsCommercial,
  '03-industrial-scaffolding-challenges': blogIndustrialChallenges,
  '04-scaffolding-costs-guide': blogCostsGuide,
  '05-seismic-scaffolding-christchurch': blogSeismicChristchurch,
  'cantilever-scaffolding-solutions': blogCantileverSolutions,
  '5-signs-better-access-solutions': blogAccessSolutions,
  'choosing-right-scaffolding-system': blogChoosingRightSystem,
  'commercial-facade-restoration-case-study': blogFacadeRestoration,
  'construction-site-safety-scaffolding': blogConstructionSafety,
  'diy-scaffolding-safety-guide': blogDiySafetyGuide,
  'industrial-scaffolding-challenges': blogIndustrialChallenges2,
  'residential-vs-commercial-scaffolding': blogResidentialCommercial2,
  'scaffold-inspection-requirements': blogInspectionRequirements,
  'scaffolding-for-different-trades': blogDifferentTrades,
  'scaffolding-hire-costs-canterbury': blogHireCostsCanterbury,
  'scaffolding-insurance-coverage': blogInsuranceCoverage,
  'scaffolding-modifications-during-project': blogModificationsProject,
  'scaffolding-timeline-planning': blogTimelinePlanning,
  'scaffolding-for-roof-work': blogRoofWork,
  'scaffolding-weather-management': blogWeatherManagement,
  'site-preparation-scaffolding-installation': blogSitePreparation,
  'true-cost-scaffolding-accidents': blogAccidentCosts,
  'winter-scaffolding-preparation': blogWinterPreparation,
  'working-at-height-options': blogHeightOptions,
  'seismic-scaffolding-christchurch': blogSeismicEngineering,
};

const categoryImages: Record<string, string> = {
  'Safety': '/images/blog/safety.svg',
  'Guide': '/images/blog/guide.svg',
  'Costs': '/images/blog/costs.svg',
  'Industrial': '/images/blog/industrial.svg',
  'Residential': '/images/blog/residential.svg',
  'Commercial': '/images/blog/commercial.svg',
  'Planning': '/images/blog/planning.svg',
  'Weather': '/images/blog/weather.svg',
  'Inspection': '/images/blog/inspection.svg',
  'Seismic': '/images/blog/seismic.svg',
  'Access': '/images/blog/access.svg',
  'Roof': '/images/blog/roof.svg',
  'Technical': '/images/blog/guide.svg',
};

export function getBlogImageForPost(post: { id: string; data: { category: string; title: string } }): BlogImageResult {
  const postId = post.id.replace(/\.md$/, '');
  const category = post.data.category;
  const title = post.data.title.toLowerCase();

  if (specificImages[postId]) {
    return { src: specificImages[postId], isOptimized: true };
  }

  if (categoryImages[category]) {
    return { src: categoryImages[category], isOptimized: false };
  }

  if (title.includes('safety') || title.includes('accident') || title.includes('incident')) {
    return { src: categoryImages['Safety'], isOptimized: false };
  }
  if (title.includes('guide') || title.includes('how to') || title.includes('tips')) {
    return { src: categoryImages['Guide'], isOptimized: false };
  }
  if (title.includes('cost') || title.includes('price') || title.includes('hire')) {
    return { src: categoryImages['Costs'], isOptimized: false };
  }
  if (title.includes('industrial')) {
    return { src: categoryImages['Industrial'], isOptimized: false };
  }
  if (title.includes('residential') || title.includes('home') || title.includes('house')) {
    return { src: categoryImages['Residential'], isOptimized: false };
  }
  if (title.includes('commercial') || title.includes('office') || title.includes('retail')) {
    return { src: categoryImages['Commercial'], isOptimized: false };
  }
  if (title.includes('plan') || title.includes('timeline') || title.includes('schedule')) {
    return { src: categoryImages['Planning'], isOptimized: false };
  }
  if (title.includes('weather') || title.includes('winter') || title.includes('rain')) {
    return { src: categoryImages['Weather'], isOptimized: false };
  }
  if (title.includes('inspect') || title.includes('check') || title.includes('requirement')) {
    return { src: categoryImages['Inspection'], isOptimized: false };
  }
  if (title.includes('seismic') || title.includes('earthquake') || title.includes('christchurch')) {
    return { src: categoryImages['Seismic'], isOptimized: false };
  }
  if (title.includes('access') || title.includes('complex')) {
    return { src: categoryImages['Access'], isOptimized: false };
  }
  if (title.includes('roof')) {
    return { src: categoryImages['Roof'], isOptimized: false };
  }

  return { src: categoryImages['Safety'], isOptimized: false };
}
