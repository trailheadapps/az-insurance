@echo OFF

rem Set parameters
set ORG_ALIAS=az-insurance

@echo:
echo Installing AZ Insurance scratch org (%ORG_ALIAS%)
@echo:

rem Install script
echo Cleaning previous scratch org...
cmd.exe /c sf org delete scratch -p -o  %ORG_ALIAS% 2>NUL
@echo:

echo Creating scratch org...
cmd.exe /c sf org create scratch -f config/project-scratch-def.json -d 30 -a %ORG_ALIAS%
call :checkForError
@echo:

echo Creating dummy Experience site...
cmd.exe /c sf community create --name "Dummy" --template-name "Aloha" -p "dummy"
call :checkForError
@echo:

echo Deploying standard metadata...
cmd.exe /csf project deploy start --metadata ApexClass --metadata Layout --metadata CustomObject --metadata LightningComponentBundle --metadata ManagedContentType --metadata CustomObject --metadata StaticResource --metadata CustomTab --metadata PermissionSet --metadata Flow
call :checkForError
@echo:
cd %CD%/..

echo Deploying Experience site metadata...
cmd.exe /c sf project deploy start --metadata ApexPage --metadata CustomSite --metadata ExperienceBundle --metadata NavigationMenu --metadata Network --metadata Profile --ignore-conflicts
call :checkForError
@echo:

echo Assigning permission set for Marketing Site Builder
cmd.exe /c sf org assign permset -n LWR_Marketing_Builder
@echo:

echo Publishing Marketing Site...
cmd.exe /c sf community publish -n "LWR Demo Marketing" 
call :checkForError
@echo:

echo Publishing Agent Portal...
cmd.exe /c sf community publish -n "LWR Demo Agent" 
call :checkForError
@echo:

rem Report install success if no error
@echo:
if ["%errorlevel%"]==["0"] (
  echo Installation completed.
  @echo:
)

:: ======== FN ======
GOTO :EOF

rem Display error if the install has failed
:checkForError
if NOT ["%errorlevel%"]==["0"] (
    echo Installation failed.
    exit /b %errorlevel%
)