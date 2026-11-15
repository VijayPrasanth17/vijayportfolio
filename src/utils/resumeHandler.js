import { portfolioConfig } from '../data/portfolio.js';

export async function handleResumeDownload(onMissingResume) {
  const filePath = portfolioConfig.resume.filePath;
  const filename = portfolioConfig.resume.downloadFilename;

  try {
    const response = await fetch(filePath, { method: 'HEAD' });
    const contentType = response.headers.get('content-type') || '';
    if (!response.ok || !contentType.toLowerCase().includes('pdf')) {
      onMissingResume?.();
      return false;
    }

    const link = document.createElement('a');
    link.href = filePath;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch {
    onMissingResume?.();
    return false;
  }
}
