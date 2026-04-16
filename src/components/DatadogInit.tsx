'use client'; // Wajib karena SDK ini butuh window/browser object

import { datadogRum } from '@datadog/browser-rum';
import { useEffect } from 'react';

export default function DatadogInit() {
  useEffect(() => {
    datadogRum.init({
      applicationId: 'KODE-APP-ID-KAMU', // Ganti dengan ID dari dashboard Datadog
      clientToken: 'KODE-CLIENT-TOKEN-KAMU', // Ganti dengan Token dari dashboard Datadog
      site: 'datadoghq.com',
      service: 'minibank-frontend',
      env: 'development',
      version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: 'mask-user-input',
      allowedTracingUrls: [
        "http://localhost:8081",
        "http://localhost:8082",
        "http://localhost:8083",
        /https:\/\/.*\.minibank\.com/
      ],
    });
  }, []);

  return null; // Komponen ini tidak merender apapun secara visual
}