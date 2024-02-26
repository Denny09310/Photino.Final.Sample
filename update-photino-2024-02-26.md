# Photino.NET Project Update (26/02/2024) 🚀

>Hey folks, just dropping a quick update on the Photino.NET scene. Heads up, I'm sharing it here 'cause I kicked off the convo. If this ain't the right spot, just send me a message.

So, it's been about a year since we started this discussion. I haven't been grinding into the project every single day, but got a few things to share.

## Project Naming Tweaks 

First off, noticed all the projects are rolling with the name **Photino.***, but the namespace is PhotinoNET. A bit wonky, right? At least for me, so I made a small tweak to keep things in sync. It might ruffle some feathers, but no worries it's reversible if it's not your jam.

Inside Photino.NET, made some updates to the language conventions. Check this out:

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

Might look a bit like déjà vu, but it's all about supporting .NET 6 until it waves goodbye 👋. The current setup, leaning on source generators, amps up project performance and keeps it smooth without leaning on runtime tricks. Also sprinkled in some C# 12 syntactic sweetness.

## Dev Server Glow-Up in Photino.NET.Server

Big things happening in the Photino.NET.Server package! Revamped the dev server, inspired by the #135 chat shoutout to @manuel3108 for the initial code! As a React dev, I've made a simple static server that knows when to attach to a localserver in DEVELOPMENT and use the wwwroot files in PRODUCTION.

To make life easy for AspNET folks making the switch to Photino, took some cues from the AspNET Core playbook. Introduced a cool PhotinoApplication class, kind of like the WebApplication one. And get this, brought in a 'PhotinoAppBuilder' to enhanche the existing WebAppBuilder. Bunch of extension methods tapping into the main PhotinoWindow and Microsoft's hosting magic. Pulled in some tricks from the Blazor version of Photino staying true to my Blazor roots. For the ones who want to take look to the code, dive into the debug branch in the fork mentioned in the main discussion post.

## Spicing Things Up with IPC Magic

I've added a simple IPC (Inter-Process Communication) channel system, inspired by the one you find in Electron. It's pretty basic for now, but it gets the job done. Messages get sent to channel listeners, and we can grab data back all in a neat, type-safe way. Check out the simple mirroring setup for JavaScript and TypeScript in the `Photino.Final.Sample` it's a mini IPC sample!

## Wrapping it Up with the Final Mix

So, here's the grand finale my "Final" project. It's like a mashup of all the tweaks I've been talking about. I tossed everything in there to see if it all jives with the latest changes. To make life easier, think about throwing this project into the sample repository. Just swap out references to other projects with the actual NuGet packages, and we're good to go!

Big thanks to everyone who threw down in this project! 🚀 Your hustle is real, and I appreciate every line of code, idea, and vibe you brought to the table. Hoping this sails through smooth! 🌟
