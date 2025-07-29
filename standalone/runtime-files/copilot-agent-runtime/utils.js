// utils.js
function buildPayload(intent) {
  const basePayload = {
    timestamp: Date.now(),
    command: intent.command,
    source: 'ClinemapRuntime',
  };

  switch (intent.command) {
    case 'mint-nft':
      return {
        ...basePayload,
        type: 'mint-nft',
        metadata: intent.meta,
        contractParams: intent.contractParams || {},
        userWallet: intent.walletAddress || '0x000000000000000000000000000000000000dead',
      };

    case 'deploy-smart-contract':
      return {
        ...basePayload,
        type: 'deploy-smart-contract',
        contractCode: intent.code,
        network: intent.network || 'ethereum',
      };

    case 'generate-landing-page':
      return {
        ...basePayload,
        type: 'generate-landing-page',
        theme: intent.theme || 'dark',
        copyBlocks: intent.copy || [],
      };

    default:
      return {
        ...basePayload,
        type: 'generic-task',
        details: intent,
      };
  }
}

