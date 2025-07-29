
export class SmartPayloadBuilder {
  static build(parsedIntent, options = {}) {
    const basePayload = {
      intent: parsedIntent,
      timestamp: Date.now(),
      options: options
    };

    // Build context-aware payload based on intent type
    switch (parsedIntent.type) {
      case 'nftMint':
        return this.buildNFTMintPayload(basePayload, parsedIntent);
      
      case 'deploymentLogic':
        return this.buildDeploymentPayload(basePayload, parsedIntent);
      
      case 'moduleGeneration':
        return this.buildModulePayload(basePayload, parsedIntent);
      
      case 'apiEndpoint':
        return this.buildAPIPayload(basePayload, parsedIntent);
      
      case 'mindMapEnhanced':
        return this.buildMindMapPayload(basePayload, parsedIntent);
      
      default:
        return this.buildGenericPayload(basePayload, parsedIntent);
    }
  }

  static buildNFTMintPayload(base, intent) {
    return {
      ...base,
      template: 'nft-mint-trigger',
      features: ['sha-logging', 'vault-integration', 'event-emission'],
      blockchain: intent.entities.includes('ethereum') ? 'ethereum' : 'polygon',
      security: 'high'
    };
  }

  static buildDeploymentPayload(base, intent) {
    return {
      ...base,
      template: 'deployment-automation',
      features: ['ci-cd', 'environment-config', 'rollback-support'],
      target: 'replit',
      strategy: 'rolling'
    };
  }

  static buildModulePayload(base, intent) {
    return {
      ...base,
      template: 'module-scaffold',
      features: ['typescript', 'testing', 'documentation'],
      structure: 'modular',
      exports: 'esm'
    };
  }

  static buildAPIPayload(base, intent) {
    return {
      ...base,
      template: 'api-endpoint',
      features: ['validation', 'error-handling', 'auth'],
      method: 'POST',
      middleware: ['cors', 'rate-limit']
    };
  }

  static buildMindMapPayload(base, intent) {
    const { MindMapProcessor } = require('./mindMapProcessor.js');
    const mindMapContext = MindMapProcessor.generateMindMapPayload(intent.mindMapIntelligence, base.options);
    
    return MindMapProcessor.enhanceWithMindMapContext({
      ...base,
      template: 'mindmap-enhanced-generation',
      features: ['conceptual-architecture', 'hierarchical-structure', 'relationship-mapping'],
      intelligenceLevel: 'enhanced'
    }, mindMapContext);
  }

  static buildGenericPayload(base, intent) {
    return {
      ...base,
      template: 'generic-code',
      features: intent.modifiers,
      language: base.options.targetLanguage || 'typescript'
    };
  }
}
