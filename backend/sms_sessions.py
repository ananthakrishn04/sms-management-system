import subprocess

def start_screen_session(program_name):
    cmd = f"screen -dmS {program_name}"
    subprocess.run(cmd, shell=True)

def stop_screen_session(program_name):
    cmd = f"screen -S {program_name} -X quit"
    subprocess.run(cmd, shell=True)

def restart_screen_session(program_name):
    stop_screen_session(program_name)
    start_screen_session(program_name)
