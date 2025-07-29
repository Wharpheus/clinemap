// runtime/index.ts
import { MintNFTAgent } from './agents/MintNFTAgent';
import { SmartContractAgent } from './agents/SmartContractAgent';
import { LandingPageAgent } from './agents/LandingPageAgent';
import { GenericAgent } from './agents/GenericAgent';
import { buildPayload } from '../utils';

export function runTask(intentCommand: string, rawIntentData = {}) {
  const payload = buildPayload({ command: intentCommand, ...rawIntentData });

  switch (payload.type) {
    case 'mint-nft':
      return MintNFTAgent.execute(payload);
    case 'deploy-smart-contract':
      return SmartContractAgent.execute(payload);
    case 'generate-landing-page':
      return LandingPageAgent.execute(payload);
    default:
      return GenericAgent.execute(payload);
  }
}
