# Videos Directory

Place your high-quality video files here:

## Recommended Video Specifications:
- **Format**: MP4 (H.264) and WebM (VP9) for best browser compatibility
- **Resolution**: 1920x1080 (Full HD) or higher
- **Frame Rate**: 30fps or 60fps
- **Aspect Ratio**: 16:9
- **File Size**: Optimize for web (use compression tools)

## Files to add:
1. `hero-video.mp4` - Main video file (MP4 format)
2. `hero-video.webm` - Alternative format for better compression (optional but recommended)

## Video Content Suggestions:
- Billiards/pool table gameplay
- Lounge atmosphere
- Premium interior shots
- People enjoying the venue
- Slow-motion shots of balls/pool cues

## Optimization Tips:
- Use tools like HandBrake or FFmpeg to compress videos
- Keep file size under 10MB for faster loading
- Consider using a CDN for very large files
- Test video on different devices and connections

## Example FFmpeg command to optimize:
```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 23 -preset medium -vf scale=1920:1080 -r 30 hero-video.mp4
```

