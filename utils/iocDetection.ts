export function detectIoCType(value: string): string | null {
  // IP address regex (IPv4)
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  
  // Domain regex
  const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  
  // URL regex
  const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  
  // MD5 hash
  const md5Regex = /^[a-fA-F0-9]{32}$/;
  
  // SHA-1 hash
  const sha1Regex = /^[a-fA-F0-9]{40}$/;
  
  // SHA-256 hash
  const sha256Regex = /^[a-fA-F0-9]{64}$/;

  if (ipRegex.test(value)) return 'ip';
  if (urlRegex.test(value)) return 'url';
  if (domainRegex.test(value)) return 'domain';
  if (md5Regex.test(value)) return 'md5';
  if (sha1Regex.test(value)) return 'sha1';
  if (sha256Regex.test(value)) return 'sha256';

  return null;
}