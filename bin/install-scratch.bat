@echo OFF

rem Set parameters
set ORG_ALIAS=az-insurance

@echo:
echo Installing AZ Insurance scratch org (%ORG_ALIAS%)
@echo:

rem Install script
echo Cleaning previous scratch org...
cmd.exe /c sfdx force:org:delete -p -u %ORG_ALIAS% 2>NUL
@echo:

echo Creating scratch org...
cmd.exe /c sfdx force:org:create -s -f config/project-scratch-def.json -d 30 -a %ORG_ALIAS%
call :checkForError
@echo:

echo Creating dummy Experience site...
cmd.exe /c sfdx force:community:create --name "Dummy" --templatename "Aloha" -p "dummy"
call :checkForError
@echo:

echo Deploying standard metadata...
cmd.exe /c sfdx force:source:deploy -m ApexClass,Layout,CustomObject,LightningComponentBundle,ManagedContentType,CustomObject,StaticResource,CustomTab,PermissionSet,Flow
call :checkForError
@echo:
cd %CD%/..

echo Deploying Experience site metadata...
cmd.exe /c sfdx force:source:deploy -m ApexPage,CustomSite,ExperienceBundle,NavigationMenu,Network,Profile
call :checkForError
@echo:

echo Assigning permission set for Marketing Site Builder
cmd.exe /c sfdx force:user:permset:assign -n LWR_Marketing_Builder
@echo:

echo Publishing Marketing Site...
cmd.exe /c sfdx force:community:publish -n "LWR Demo Marketing" 
call :checkForError
@echo:

echo Publishing Agent Portal...
cmd.exe /c sfdx force:community:publish -n "LWR Demo Agent" 
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