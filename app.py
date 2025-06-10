from flask import Flask, render_template,request
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
app = Flask(__name__)

SPOTIFY_CLIENT_ID = 'Enter you Spotify Client ID here'
# Replace with your actual Spotify Client ID
SPOTIFY_CLIENT_SECRET =' Enter your Spotify Client Secret here'
# Replace with your actual Spotify Client Secret

# authenticate with spotify
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id=SPOTIFY_CLIENT_ID,
    client_secret= SPOTIFY_CLIENT_SECRET
    ))
    

@app.route('/', methods=['GET', 'POST'])
def home():
    bot_response = None
    song_data = [] # initialize as empty list
    if request.method == 'POST':
        user_message = request.form['user_message']

        #search for track
        try:
            results = sp.search(q=f'mood:{user_message}', type='track', limit=4)
            tracks = results['tracks']['items']

            if tracks:
                for track in tracks:
                    song_name = track['name']
                    song_url = track['external_urls']['spotify']
                    album_art = track['album']['images'][0]['url'] if track['album']['images']  else 'https://via.placeholder.com/100'
                    song_data.append((song_name, song_url, album_art))

                bot_response = f"PuZzle -> 😎"

            else:
                bot_response = f"Bot: Sorry, I couldn't find any {user_message} songs."
        
        except Exception as e:
            bot_response = f"Bot: Oops! Something went wrong: {str(e)}"

    return render_template('main.html',bot_response= bot_response, song_data= song_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)