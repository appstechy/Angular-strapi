'use strict';

/**
 * register-for-newsletter service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::register-for-newsletter.register-for-newsletter');
