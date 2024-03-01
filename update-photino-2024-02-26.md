# Photino.NET Project Update (26/02/2024) 🚀

>Dear community members, 

I am pleased to provide a brief update on the recent developments within the Photino.NET project. I hope this communication finds you well, and I appreciate your attention to this update. Should you find this platform unsuitable for such information, please feel free to direct your queries to me via private message.

Over the past year, since the inception of our discussions, I've not been immersed in the project on a daily basis. However, I have some noteworthy progress to share.

## Project Naming Adjustments 

First and foremost, I observed that all projects are utilizing the name **Photino.***, while the namespace is specified as PhotinoNET. This inconsistency prompted me to make a minor adjustment to ensure coherence. While this change may cause some initial dissonance, rest assured it is reversible if it doesn't align with the community's preferences.

Within Photino.NET, I have made updates to language conventions. Please review the following code snippet:

```csharp
#if NET7_0_OR_GREATER

    [LibraryImport(DLL_NAME, SetLastError = true)]
    [UnmanagedCallConv(CallConvs = new Type[] { typeof(System.Runtime.CompilerServices.CallConvCdecl) })]
    static partial void Photino_Invoke(IntPtr instance, InvokeCallback callback);

#else

    [DllImport(DLL_NAME, CallingConvention = CallingConvention.Cdecl, SetLastError = true)] 
    static extern void Photino_Invoke(IntPtr instance, InvokeCallback callback); 

#endif
```

While it may appear to duplicate code, this adjustment is aimed at supporting .NET 6 until its deprecation. The current configuration, leveraging source generators, enhances project performance without relying on runtime tricks. Additionally, I've incorporated syntactic improvements introduced in C# 12.

## Development Server Enhancement in Photino.NET.Server

Significant enhancements have been implemented in the Photino.NET.Server package! The development server has undergone a revamp, inspired by the #121 chat discussion with a special shoutout to @manuel3108 for the initial code! As a React developer, I've created a straightforward static server that intelligently attaches to a local server in DEVELOPMENT and utilizes the wwwroot files in PRODUCTION.

To facilitate the transition for AspNET developers moving to Photino, I drew inspiration from the AspNET Core playbook. I introduced a new class, PhotinoApplication, akin to WebApplication, and brought in a 'PhotinoAppBuilder' to enhance the existing WebAppBuilder. Several extension methods tap into the main PhotinoWindow and leverage Microsoft's hosting capabilities. Drawing from my roots in Blazor, I've incorporated tricks from the Blazor version of Photino. For those interested in examining the code, please explore the debug branch in the fork mentioned in the primary discussion post.

## Introducing IPC (Inter-Process Communication)

I have implemented a straightforward Inter-Process Communication (IPC) channel system, inspired by the one found in Electron. Although basic at this stage, it effectively fulfills its purpose. Messages are dispatched to channel listeners, and data retrieval is neatly executed in a type-safe manner. Explore the simple mirroring setup for JavaScript and TypeScript in the Photino.Final.Sample – it serves as a miniature IPC sample!

## The Final Sample
In conclusion, I present the pinnacle of my efforts – the "Photino.Final.Sample" project. This amalgamation encapsulates all the aforementioned tweaks. To streamline integration, I propose incorporating this project into the sample repository. Simply replace references to other projects with the actual NuGet packages, and we should be good to go!

I extend my sincere gratitude to everyone who has contributed to this project! 🚀 Your dedication is palpable, and I value every line of code, idea, and positive energy brought to the table. I am optimistic that this update will be well-received! 🌟

>P.S. <br>
I have conducted testing using the TestBench project within the Samples, albeit exclusively on Windows. While I can explore functionalities on Linux using WSL 2, I lack access to a MacOS device. If anyone is willin