'use client'; // Wajib karena SDK ini butuh window/browser object

import { datadogRum } from '@datadog/browser-rum';
import { useEffect } from 'react';

export default function DatadogInit() {
  useEffect(() => {
    datadogRum.init({
      applicationId: '23e51808-c607-4759-89cd-8c228ef54edf', // Ganti dengan ID dari dashboard Datadog
      clientToken: 'pub503c894a2f5e9f1ac113339078a9dc2c', // Ganti dengan Token dari dashboard Datadog
      site: 'datadoghq.com',
      service: 'minibank',
      env: 'development',
      version: 'v1',
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