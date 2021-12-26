import os
from fastapi import FastAPI
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

url = os.getenv('SUPABASE_TABSMONSTER_URL')
key = os.getenv('SUPABASE_TABSMONSTER_KEY')
supabase: Client = create_client(url, key)

@app.get("/themes")
def themes():
    themes = supabase.table('themes').select('*').execute()
    for theme in themes['data']:
        theme['monsterThemeBg'] = supabase.storage().StorageFileAPI('supafast-api').get_public_url('themes/'+ theme['monsterTheme'].replace(' ','-') + '.png')
    
    return themes

@app.get("/monsters/")
def monsters(theme : str = "techTwitter"):
    monsters = supabase.table('monsters').select('*').eq('monsterTheme',theme).execute()
    for monster in monsters['data']:
        monster['monsterBg'] = supabase.storage().StorageFileAPI('supafast-api').get_public_url(monster['monsterTheme']+'/'+ monster['monsterName'].replace(' ','-') + '.png')

    return monsters