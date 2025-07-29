
export class MobileAppParser {
  static parse(intent) {
    const mobilePatterns = {
      ecommerce: /e-?commerce|shopping|store|marketplace/i,
      social: /social|chat|messaging|community/i,
      fitness: /fitness|health|workout|tracking/i,
      productivity: /productivity|todo|notes|organization/i,
      entertainment: /game|entertainment|media|streaming/i,
      education: /education|learning|course|tutorial/i,
      finance: /finance|banking|payment|wallet/i,
      travel: /travel|booking|navigation|maps/i
    };

    const featurePatterns = {
      camera: /camera|photo|image|video/i,
      notifications: /notification|push|alert/i,
      offline: /offline|cache|sync/i,
      payment: /payment|purchase|billing|monetization/i,
      auth: /login|auth|signin|signup/i,
      geolocation: /location|gps|maps|navigation/i,
      analytics: /analytics|tracking|metrics/i,
      ads: /ads|advertisement|monetization/i
    };

    const platformPatterns = {
      ios: /ios|iphone|ipad|apple/i,
      android: /android|google|play store/i,
      web: /web|browser|pwa/i,
      desktop: /desktop|electron|windows|mac/i
    };

    const parsed = {
      appType: 'general',
      features: [],
      platforms: [],
      monetization: 'free',
      framework: 'react-native'
    };

    // Detect app type
    for (const [type, pattern] of Object.entries(mobilePatterns)) {
      if (pattern.test(intent)) {
        parsed.appType = type;
        break;
      }
    }

    // Extract features
    for (const [feature, pattern] of Object.entries(featurePatterns)) {
      if (pattern.test(intent)) {
        parsed.features.push(feature);
      }
    }

    // Extract target platforms
    for (const [platform, pattern] of Object.entries(platformPatterns)) {
      if (pattern.test(intent)) {
        parsed.platforms.push(platform);
      }
    }

    // Default to mobile platforms if none specified
    if (parsed.platforms.length === 0) {
      parsed.platforms = ['ios', 'android'];
    }

    // Detect monetization intent
    if (/premium|paid|subscription/i.test(intent)) {
      parsed.monetization = 'subscription';
    } else if (/ads|advertisement/i.test(intent)) {
      parsed.monetization = 'ads';
    } else if (/freemium/i.test(intent)) {
      parsed.monetization = 'freemium';
    }

    // Detect framework preference
    if (/flutter/i.test(intent)) {
      parsed.framework = 'flutter';
    } else if (/native|swift|kotlin/i.test(intent)) {
      parsed.framework = 'native';
    } else if (/ionic/i.test(intent)) {
      parsed.framework = 'ionic';
    }

    return parsed;
  }

  static generateAppTemplate(parsedIntent) {
    const templates = {
      ecommerce: {
        components: ['product-list', 'cart', 'checkout', 'user-profile'],
        features: ['payment', 'notifications', 'offline'],
        navigation: 'tab-navigator'
      },
      social: {
        components: ['feed', 'chat', 'profile', 'friends'],
        features: ['camera', 'notifications', 'auth'],
        navigation: 'stack-navigator'
      },
      fitness: {
        components: ['workout-tracker', 'progress', 'goals', 'stats'],
        features: ['geolocation', 'notifications', 'analytics'],
        navigation: 'drawer-navigator'
      }
    };

    return templates[parsedIntent.appType] || templates.general;
  }
}
