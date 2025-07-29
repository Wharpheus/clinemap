
import { MindMapProcessor } from './mindMapProcessor.js';

export class DSLParser {
  static parse(intent) {
    const patterns = {
      nftMint: /create.*nft.*mint.*trigger/i,
      deploymentLogic: /deploy.*logic|deployment.*script/i,
      moduleGeneration: /create.*module|generate.*component/i,
      apiEndpoint: /create.*api|generate.*endpoint/i,
      smartContract: /smart.*contract|blockchain.*logic/i,
      mindMapEnhanced: /\b(mind\s*map|conceptual|structure|hierarchy|relationship)\b/i
    };

    const parsed = {
      type: 'unknown',
      entities: [],
      modifiers: [],
      targetFramework: null
    };

    // Extract intent type
    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(intent)) {
        parsed.type = type;
        break;
      }
    }

    // Extract entities (nouns and technical terms)
    const entityMatches = intent.match(/\b(NFT|SHA|log|vault|trigger|mint|deploy|API|endpoint)\b/gi);
    if (entityMatches) {
      parsed.entities = [...new Set(entityMatches.map(e => e.toLowerCase()))];
    }

    // Extract modifiers (adjectives and technical specs)
    const modifierMatches = intent.match(/\b(secure|async|encrypted|automated|scalable)\b/gi);
    if (modifierMatches) {
      parsed.modifiers = modifierMatches.map(m => m.toLowerCase());
    }

    // Detect target framework
    if (intent.includes('react') || intent.includes('tsx')) {
      parsed.targetFramework = 'react';
    } else if (intent.includes('vue')) {
      parsed.targetFramework = 'vue';
    } else if (intent.includes('node') || intent.includes('express')) {
      parsed.targetFramework = 'node';
    }

    // Enhanced mind map intelligence
    if (parsed.type === 'mindMapEnhanced' || intent.includes('mindmap') || intent.includes('conceptual')) {
      const mindMapContext = MindMapProcessor.parseMindMapIntent(intent);
      parsed.mindMapIntelligence = mindMapContext;
    }

    return parsed;
  }
}
