/**
 * Content extraction templates for Firecrawl service
 * These templates define how to extract structured data from various medical and health websites
 */

export const extractionTemplates = {
  /**
   * PubMed article extraction template
   */
  pubmed: {
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Article title' },
        abstract: { type: 'string', description: 'Article abstract' },
        authors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              affiliation: { type: 'string' }
            }
          }
        },
        publicationInfo: {
          type: 'object',
          properties: {
            journal: { type: 'string' },
            year: { type: 'number' },
            volume: { type: 'string' },
            issue: { type: 'string' },
            pages: { type: 'string' },
            doi: { type: 'string' },
            pmid: { type: 'string' },
            pmcid: { type: 'string' }
          }
        },
        keywords: {
          type: 'array',
          items: { type: 'string' }
        },
        meshTerms: {
          type: 'array',
          items: { type: 'string' }
        },
        conclusions: { type: 'string' },
        clinicalRelevance: { type: 'string' }
      }
    },
    prompt: 'Extract structured information from this PubMed article. Focus on key findings, clinical relevance, and practical applications for functional medicine practice.',
    systemPrompt: 'You are a medical research assistant specializing in extracting and summarizing scientific literature for functional medicine practitioners.'
  },

  /**
   * Clinical trial extraction template
   */
  clinicalTrial: {
    schema: {
      type: 'object',
      properties: {
        trialId: { type: 'string', description: 'NCT number or trial identifier' },
        title: { type: 'string' },
        status: { type: 'string', enum: ['recruiting', 'active', 'completed', 'terminated', 'withdrawn'] },
        phase: { type: 'string', enum: ['early-phase-1', 'phase-1', 'phase-2', 'phase-3', 'phase-4', 'na'] },
        studyType: { type: 'string', enum: ['interventional', 'observational', 'registry'] },
        conditions: {
          type: 'array',
          items: { type: 'string' }
        },
        interventions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' }
            }
          }
        },
        primaryOutcomes: {
          type: 'array',
          items: { type: 'string' }
        },
        secondaryOutcomes: {
          type: 'array',
          items: { type: 'string' }
        },
        enrollment: { type: 'number' },
        startDate: { type: 'string' },
        completionDate: { type: 'string' },
        locations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              facility: { type: 'string' },
              city: { type: 'string' },
              state: { type: 'string' },
              country: { type: 'string' }
            }
          }
        },
        principalInvestigator: { type: 'string' },
        sponsor: { type: 'string' },
        results: {
          type: 'object',
          properties: {
            summary: { type: 'string' },
            primaryOutcomeResults: { type: 'string' },
            adverseEvents: { type: 'string' }
          }
        }
      }
    },
    prompt: 'Extract comprehensive clinical trial information. Focus on study design, interventions, outcomes, and any available results.',
    systemPrompt: 'You are a clinical research analyst extracting trial data for medical professionals.'
  },

  /**
   * Medical journal article extraction template
   */
  medicalJournal: {
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        authors: {
          type: 'array',
          items: { type: 'string' }
        },
        journal: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            impactFactor: { type: 'number' },
            volume: { type: 'string' },
            issue: { type: 'string' },
            pages: { type: 'string' }
          }
        },
        publicationDate: { type: 'string' },
        doi: { type: 'string' },
        articleType: { type: 'string', enum: ['research', 'review', 'meta-analysis', 'case-report', 'editorial', 'letter'] },
        abstract: {
          type: 'object',
          properties: {
            background: { type: 'string' },
            methods: { type: 'string' },
            results: { type: 'string' },
            conclusions: { type: 'string' }
          }
        },
        keyFindings: {
          type: 'array',
          items: { type: 'string' }
        },
        methodology: {
          type: 'object',
          properties: {
            studyDesign: { type: 'string' },
            sampleSize: { type: 'number' },
            duration: { type: 'string' },
            statisticalAnalysis: { type: 'string' }
          }
        },
        clinicalImplications: { type: 'string' },
        limitations: {
          type: 'array',
          items: { type: 'string' }
        },
        conflictsOfInterest: { type: 'string' },
        funding: { type: 'string' }
      }
    },
    prompt: 'Extract detailed information from this medical journal article. Emphasize clinical applicability and evidence quality.',
    systemPrompt: 'You are a medical literature analyst focusing on evidence-based medicine and clinical applications.'
  },

  /**
   * Health news article extraction template
   */
  healthNews: {
    schema: {
      type: 'object',
      properties: {
        headline: { type: 'string' },
        subheadline: { type: 'string' },
        author: { type: 'string' },
        publicationDate: { type: 'string' },
        source: { type: 'string' },
        topic: { type: 'string' },
        keyPoints: {
          type: 'array',
          items: { type: 'string' }
        },
        medicalClaims: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              claim: { type: 'string' },
              evidence: { type: 'string' },
              credibility: { type: 'string', enum: ['high', 'moderate', 'low', 'unsubstantiated'] }
            }
          }
        },
        expertQuotes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              expert: { type: 'string' },
              credentials: { type: 'string' },
              quote: { type: 'string' }
            }
          }
        },
        studiesReferenced: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              journal: { type: 'string' },
              year: { type: 'number' },
              findings: { type: 'string' }
            }
          }
        },
        practicalTakeaways: {
          type: 'array',
          items: { type: 'string' }
        },
        accuracyAssessment: {
          type: 'object',
          properties: {
            overallAccuracy: { type: 'string', enum: ['accurate', 'mostly-accurate', 'mixed', 'misleading'] },
            concerns: { type: 'array', items: { type: 'string' } },
            corrections: { type: 'array', items: { type: 'string' } }
          }
        }
      }
    },
    prompt: 'Extract and fact-check health news content. Identify medical claims, assess their credibility, and summarize practical implications.',
    systemPrompt: 'You are a medical fact-checker and health journalist analyst, evaluating health news for accuracy and clinical relevance.'
  },

  /**
   * Medical conference abstract extraction template
   */
  conferenceAbstract: {
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        presenters: {
          type: 'array',
          items: { type: 'string' }
        },
        conference: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            year: { type: 'number' },
            location: { type: 'string' }
          }
        },
        abstractNumber: { type: 'string' },
        category: { type: 'string' },
        background: { type: 'string' },
        objectives: { type: 'string' },
        methods: { type: 'string' },
        results: { type: 'string' },
        conclusions: { type: 'string' },
        clinicalRelevance: { type: 'string' },
        keywords: {
          type: 'array',
          items: { type: 'string' }
        }
      }
    },
    prompt: 'Extract conference abstract information, focusing on novel findings and clinical applications.',
    systemPrompt: 'You are analyzing medical conference abstracts for cutting-edge research and clinical innovations.'
  },

  /**
   * Supplement/nutraceutical product page extraction
   */
  supplementProduct: {
    schema: {
      type: 'object',
      properties: {
        productName: { type: 'string' },
        manufacturer: { type: 'string' },
        category: { type: 'string' },
        ingredients: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              amount: { type: 'string' },
              unit: { type: 'string' },
              standardization: { type: 'string' }
            }
          }
        },
        claimedBenefits: {
          type: 'array',
          items: { type: 'string' }
        },
        suggestedUse: { type: 'string' },
        warnings: {
          type: 'array',
          items: { type: 'string' }
        },
        drugInteractions: {
          type: 'array',
          items: { type: 'string' }
        },
        clinicalEvidence: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              study: { type: 'string' },
              outcome: { type: 'string' },
              quality: { type: 'string', enum: ['high', 'moderate', 'low'] }
            }
          }
        },
        certifications: {
          type: 'array',
          items: { type: 'string' }
        },
        price: { type: 'string' },
        functionalMedicineAssessment: {
          type: 'object',
          properties: {
            qualityRating: { type: 'string', enum: ['excellent', 'good', 'fair', 'poor'] },
            bioavailability: { type: 'string' },
            recommendedFor: { type: 'array', items: { type: 'string' } },
            concerns: { type: 'array', items: { type: 'string' } }
          }
        }
      }
    },
    prompt: 'Extract supplement product information with a focus on ingredients, evidence, and functional medicine applications.',
    systemPrompt: 'You are a functional medicine practitioner evaluating nutritional supplements for clinical use.'
  },

  /**
   * Generic medical content extraction
   */
  generic: {
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        contentType: { type: 'string' },
        mainTopic: { type: 'string' },
        keyInformation: {
          type: 'array',
          items: { type: 'string' }
        },
        medicalConcepts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              concept: { type: 'string' },
              definition: { type: 'string' },
              relevance: { type: 'string' }
            }
          }
        },
        practicalApplications: {
          type: 'array',
          items: { type: 'string' }
        },
        relatedConditions: {
          type: 'array',
          items: { type: 'string' }
        },
        references: {
          type: 'array',
          items: { type: 'string' }
        },
        summary: { type: 'string' }
      }
    },
    prompt: 'Extract relevant medical information from this content. Identify key concepts, practical applications, and clinical relevance.',
    systemPrompt: 'You are a medical content analyst extracting useful information for healthcare practitioners.'
  }
};

/**
 * Get extraction template by type
 */
export function getExtractionTemplate(type: keyof typeof extractionTemplates) {
  return extractionTemplates[type] || extractionTemplates.generic;
}

/**
 * Medical website URL patterns for automatic template selection
 */
export const medicalSitePatterns = {
  pubmed: [
    /pubmed\.ncbi\.nlm\.nih\.gov/i,
    /ncbi\.nlm\.nih\.gov\/pubmed/i,
    /ncbi\.nlm\.nih\.gov\/pmc/i
  ],
  clinicalTrial: [
    /clinicaltrials\.gov/i,
    /clinical-trials/i
  ],
  medicalJournal: [
    /nejm\.org/i,
    /jamanetwork\.com/i,
    /thelancet\.com/i,
    /bmj\.com/i,
    /nature\.com\/articles/i,
    /sciencedirect\.com/i,
    /springer\.com/i,
    /wiley\.com/i
  ],
  healthNews: [
    /healthline\.com/i,
    /webmd\.com/i,
    /medicalnewstoday\.com/i,
    /health\.com/i,
    /everydayhealth\.com/i
  ],
  supplement: [
    /iherb\.com/i,
    /vitacost\.com/i,
    /pureencapsulations\.com/i,
    /designsforhealth\.com/i,
    /orthomolecular\.com/i
  ]
};

/**
 * Detect appropriate extraction template based on URL
 */
export function detectExtractionType(url: string): keyof typeof extractionTemplates {
  for (const [type, patterns] of Object.entries(medicalSitePatterns)) {
    if (patterns.some(pattern => pattern.test(url))) {
      return type as keyof typeof extractionTemplates;
    }
  }
  return 'generic';
}

/**
 * Content sanitization rules for medical accuracy
 */
export const sanitizationRules = {
  // Remove marketing language
  marketingPhrases: [
    /breakthrough/gi,
    /miracle/gi,
    /revolutionary/gi,
    /life-changing/gi,
    /guaranteed/gi,
    /clinically proven/gi, // unless in proper context
  ],
  
  // Flag unsubstantiated claims
  unsubstantiatedClaims: [
    /cures? (cancer|diabetes|alzheimer)/gi,
    /prevents? all/gi,
    /100% effective/gi,
    /no side effects/gi,
  ],
  
  // Require evidence for specific claims
  requiresEvidence: [
    'reduces risk',
    'improves outcomes',
    'clinically significant',
    'statistically significant',
    'evidence-based'
  ]
};

/**
 * Medical content quality indicators
 */
export const qualityIndicators = {
  highQuality: [
    'peer-reviewed',
    'randomized controlled trial',
    'systematic review',
    'meta-analysis',
    'published in',
    'doi:',
    'pmid:'
  ],
  
  mediumQuality: [
    'observational study',
    'case series',
    'expert opinion',
    'clinical experience',
    'preliminary findings'
  ],
  
  lowQuality: [
    'anecdotal',
    'testimonial',
    'no references',
    'blog post',
    'advertisement'
  ]
};