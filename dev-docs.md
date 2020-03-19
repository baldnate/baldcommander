# Developer Documentation

## External References

- [OBS Websocket Protocol Reference](https://github.com/Palakis/obs-websocket/blob/4.x-current/docs/generated/protocol.md)
- [SWP123 User Manual](https://media.extron.com/public/download/files/userman/SWP123_B.pdf)
- [DVS 304 DVI User Manual](https://media.extron.com/public/download/files/userman/DVS_304_Series_68-1039-01_F.pdf)

## Local References

### B-200-AVMATRIX-6x4 Programming Guide

There are hosted docs for this device, but they are in Word and Excel format for some reason.  Here are my condensed notes.

#### Serial Config

9600, 8N1

#### Command Format

AB\r, where A is the output channel and B is the input channel
Valid input channel numbers are 1-6
Valid output channel numbers are 1-4
Input channel 0 means "disconnect this output"

01\r means "power on plus return current switch status"
00\r means "soft power off the device"

## Tech Debt of Note (AKA baldnate's rambling confessions)

- I somehow based this off an Electron example that didn't properly design in main vs renderer hygiene.  I am reminded of this every time I open the dev console and see "Electron Security Warning (Insecure Content-Security-Policy)" at the top of the log.
- The previous item is not just of academic note.  Fixing this seperation, I believe, gates two features I would like to implement:
  - Global hotkeys
  - Generating keypresses to automate other programs that support global hotkeys, but not direct API access
    - AmarecTV falls into this boat
- Better buisness logic modelling.  The deluxe way to do this would be to have modules for each instrument that are baldnate agnostic (so just a wrapper around using that box by itself), and then a module on top of those that implements the "what Nate wants his entire stack to do" logic, and then finally the application UI layer itself, which would just be the final bit of glue code to bind things to controls.  Not sure how far to go towards that "right way", but it would make this more useful for others to raid for code.
- Cleaner console_data modelling.  This is related to the previous bullet.  Currently, the console_data struct is a mishmash of app level info (name of the console and mode), stack level info (what the routing through the system is like), and box level protocol details (literal command strings to be sent via RS-232 or HTTP).  The last bit would be nice to hoist up to a box level model of programming.
