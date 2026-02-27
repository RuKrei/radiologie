import sys
import json
from youtube_transcript_api import YouTubeTranscriptApi

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: simple_fetch.py <video_id>"}))
        sys.exit(1)

    video_id = sys.argv[1]

    try:
        # Instantiate without proxy/VPN for now
        api = YouTubeTranscriptApi() 
        transcript_list = api.fetch(video_id)
        
        full_text = " ".join([entry['text'] for entry in transcript_list])
        
        print(json.dumps({
            "video_id": video_id,
            "full_text": full_text
        }))

    except Exception as e:
        print(json.dumps({"error": str(e), "video_id": video_id}))
        sys.exit(1)

if __name__ == "__main__":
    main()
