/**
 * Scrapes a YouTube channel's live URL to find the active broadcast Video ID.
 * Returns { videoId: string, isLive: boolean }
 */
async function getLiveStreamId(channelId) {
  try {
    const url = channelId.startsWith('@') ? `https://www.youtube.com/${channelId}/live` : `https://www.youtube.com/channel/${channelId}/live`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      console.error(`YouTube Scraper: Failed to fetch ${url} - Status ${response.status}`);
      return { videoId: null, isLive: false };
    }

    const html = await response.text();

    // The canonical URL on a /live page always points to the watch URL if there is an active stream or recent VOD
    const idMatch = html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})"/);
    const videoId = idMatch ? idMatch[1] : null;

    if (!videoId) {
      return { videoId: null, isLive: false };
    }

    // Check if the page contains indicators that it's currently a live broadcast
    const isLiveMatch = html.includes('isLiveBroadcast') || html.includes('"isLive":true');

    return {
      videoId,
      isLive: isLiveMatch
    };
  } catch (error) {
    console.error('YouTube Scraper Error:', error);
    return { videoId: null, isLive: false };
  }
}

module.exports = {
  getLiveStreamId
};
