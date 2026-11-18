Option Explicit

Dim shell, files, folder, logPath, command, exitCode
Set shell = CreateObject("WScript.Shell")
Set files = CreateObject("Scripting.FileSystemObject")
folder = files.GetParentFolderName(WScript.ScriptFullName)
shell.CurrentDirectory = folder
logPath = files.BuildPath(shell.ExpandEnvironmentStrings("%TEMP%"), "pokedex-startup.log")

command = """" & shell.ExpandEnvironmentStrings("%ComSpec%") & """ /d /c """"" & _
    files.BuildPath(folder, "open-pokedex.bat") & """ --hidden > """ & logPath & """ 2>&1"""

' Window style 0 hides the command window and its server processes.
exitCode = shell.Run(command, 0, True)
If exitCode <> 0 Then
    shell.Popup "Pokedex could not start. See the log for details:" & vbCrLf & logPath, _
        0, "Pokedex", 16
End If
WScript.Quit exitCode
