import { Search, Bell } from 'lucide-react';
import { useEffect, useRef } from 'react';

function LazyVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const source = video.querySelector('source');
            if (source && !source.src) {
              source.src = src;
              video.load();
            }
          }
        });
      },
      { rootMargin: '100px' }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      loop
      playsInline
      controls
      preload="none"
      className="w-full rounded-2xl bg-black max-h-[540px] object-cover"
    >
      <source type="video/mp4" />
    </video>
  );
}

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!img.src) {
              img.src = src;
            }
          }
        });
      },
      { rootMargin: '100px' }
    );

    observer.observe(img);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      alt={alt}
      className="w-full rounded-2xl max-h-[540px] object-cover"
    />
  );
}

function App() {
  const handleCopyPix = () => {
    navigator.clipboard.writeText('11954560171');
    alert('Chave PIX copiada!');
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <div
        className="min-h-screen flex justify-center"
        style={{
          background: `
            radial-gradient(circle at 50% 0%, rgba(251, 176, 52, 0.25), rgba(0, 0, 0, 0) 45%),
            radial-gradient(circle at 20% 10%, rgba(251, 176, 52, 0.3), rgba(0, 0, 0, 0) 35%),
            rgb(26, 26, 26)
          `
        }}
      >
        <div className="w-full min-h-screen flex flex-col relative">
          <header className="sticky top-0 z-10 px-5 py-4 flex items-center justify-between backdrop-blur-xl bg-gradient-to-r from-[#1a1a1a]/95 to-[#2a2a2a]/85 border-b border-amber-500/20">
            <span className="text-2xl font-bold tracking-wide lowercase text-amber-400">privacy.</span>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 grid place-items-center hover:bg-amber-500/30 transition text-white">
                <Search size={20} />
              </button>
              <button className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 grid place-items-center hover:bg-amber-500/30 transition text-white">
                <Bell size={20} />
              </button>
              <button className="px-4 py-2 rounded-full border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 transition font-semibold text-white">
                Sair
              </button>
            </div>
          </header>

          <main className="w-full max-w-[1100px] mx-auto px-4 py-5 pb-10 flex flex-col gap-6">
            <section className="rounded-2xl bg-[#2a2a2a]/90 overflow-hidden border border-amber-500/10">
              <div className="h-32 relative">
                <img
                  src="https://filesjon.zapsafe.work/loira/fotos/capaprivacy.png"
                  alt="Capa"
                  className="w-full h-full object-cover opacity-85"
                />
              </div>

              <div className="px-5 pb-7 pt-14 flex flex-col items-center gap-2 relative">
                <img
                  src="https://filesjon.zapsafe.work/loira/fotos/perfildoprivacy.png"
                  alt="Avatar"
                  className="w-32 h-32 rounded-full border-4 border-[#1a1a1a] object-cover shadow-2xl -mt-20 mb-4"
                />

                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-xs text-gray-300 font-medium">Online há pouco tempo...</span>
                </div>

                <h1 className="text-3xl font-bold mb-1 text-white">Gi Campos</h1>
                <span className="text-gray-400">@gicampos1</span>

                <p className="text-gray-200 leading-relaxed max-w-xl text-center mt-2">
                  Oi amor, sou a loirinha mais gostosa e safadinha que você vai conhecer, viu? 😈 Vídeos proíbidos, bem explícitos, sexo real, lives íntimas e muito mais que você só encontra aqui comigo. 💋🔥
                </p>

                <dl className="flex flex-wrap gap-3 p-3 bg-amber-500/10 rounded-2xl mt-4 w-full max-w-xl border border-amber-500/20">
                  <div className="flex-1 min-w-[calc(50%-12px)] p-2 flex flex-col items-center gap-2">
                    <dt className="text-xs uppercase tracking-wider text-gray-400">Seguidores</dt>
                    <dd className="text-xl font-bold text-white">14,2k</dd>
                  </div>
                  <div className="flex-1 min-w-[calc(50%-12px)] p-2 border-l border-amber-500/20 flex flex-col items-center gap-2">
                    <dt className="text-xs uppercase tracking-wider text-gray-400">Posts</dt>
                    <dd className="text-xl font-bold text-white">144</dd>
                  </div>
                  <div className="flex-1 min-w-[calc(50%-12px)] p-2 border-l border-amber-500/20 border-t border-amber-500/20 flex flex-col items-center gap-2">
                    <dt className="text-xs uppercase tracking-wider text-gray-400">Vídeos</dt>
                    <dd className="text-xl font-bold text-white">76</dd>
                  </div>
                  <div className="flex-1 min-w-[calc(50%-12px)] p-2 border-l border-amber-500/20 border-t border-amber-500/20 flex flex-col items-center gap-2">
                    <dt className="text-xs uppercase tracking-wider text-gray-400">Fotos</dt>
                    <dd className="text-xl font-bold text-white">68</dd>
                  </div>
                </dl>

                <div className="flex flex-wrap gap-3 mt-4 w-full max-w-xl justify-center">
                  <button
                    onClick={handleCopyPix}
                    className="flex-1 min-w-[180px] p-4 rounded-2xl border border-amber-500/30 bg-amber-500/15 hover:bg-amber-500/25 transition flex flex-col items-start gap-1"
                  >
                    <span className="flex items-center gap-2 font-semibold text-white">
                      <span className="text-lg">🎁</span>Mimo
                    </span>
                    <small className="text-gray-300 font-medium">Copiar chave PIX</small>
                  </button>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-7">
              <article key={'100'} className="p-5 bg-[#2a2a2a]/90 rounded-3xl border border-amber-500/10 shadow-2xl flex flex-col gap-4">
                  <header className="flex items-center gap-3">
                    <img src="https://filesjon.zapsafe.work/loira/fotos/perfildoprivacy.png" alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <strong className="block text-lg text-white">Gi Campos</strong>
                      <span className="text-gray-400 text-sm">@gicampos1</span>
                    </div>
                    <time className="ml-auto text-gray-400 text-xs">{}</time>
                  </header>
                  <LazyVideo src={`https://media-wordpress.kjufc9.easypanel.host/wp-content/uploads/2026/02/05.mp4`} />
              </article>

              {[
                { type: 'video', num: 1, time: '23 de jan, 21:35' },
                { type: 'image', num: 1, time: '23 de jan, 21:34' },
                { type: 'video', num: 2, time: '23 de jan, 15:40' },
                { type: 'image', num: 2, time: '23 de jan, 15:20' },
                { type: 'video', num: 3, time: '23 de jan, 14:12' },
                { type: 'image', num: 3, time: '23 de jan, 13:45' },
                { type: 'video', num: 4, time: '23 de jan, 12:33' },
                { type: 'image', num: 4, time: '23 de jan, 11:22' },
                { type: 'video', num: 5, time: '23 de jan, 10:15' },
                { type: 'image', num: 5, time: '23 de jan, 09:48' },
                { type: 'video', num: 6, time: '23 de jan, 08:30' },
                { type: 'image', num: 6, time: '23 de jan, 07:55' },
                { type: 'video', num: 7, time: '23 de jan, 06:20' },
                { type: 'image', num: 7, time: '22 de jan, 23:40' },
                { type: 'video', num: 8, time: '22 de jan, 22:15' },
                { type: 'image', num: 8, time: '22 de jan, 21:30' },
                { type: 'video', num: 9, time: '22 de jan, 20:45' },
                { type: 'image', num: 9, time: '22 de jan, 19:22' },
                { type: 'video', num: 10, time: '22 de jan, 18:10' },
                { type: 'image', num: 10, time: '22 de jan, 17:05' },
                { type: 'video', num: 11, time: '22 de jan, 16:33' },
                { type: 'image', num: 11, time: '22 de jan, 15:48' },
                { type: 'video', num: 12, time: '22 de jan, 14:20' },
                { type: 'image', num: 12, time: '22 de jan, 13:15' },
                { type: 'video', num: 13, time: '22 de jan, 12:40' },
                { type: 'image', num: 13, time: '22 de jan, 11:55' },
                { type: 'video', num: 14, time: '22 de jan, 10:30' },
                { type: 'image', num: 14, time: '22 de jan, 09:45' },
                { type: 'video', num: 15, time: '22 de jan, 08:22' },
                { type: 'image', num: 15, time: '22 de jan, 07:10' },
                { type: 'video', num: 16, time: '22 de jan, 06:35' },
                { type: 'image', num: 16, time: '21 de jan, 23:50' },
                { type: 'video', num: 17, time: '21 de jan, 22:25' },
                { type: 'image', num: 17, time: '21 de jan, 21:40' },
                { type: 'video', num: 18, time: '21 de jan, 20:55' },
                { type: 'image', num: 18, time: '21 de jan, 19:32' },
                { type: 'video', num: 19, time: '21 de jan, 18:20' },
                { type: 'image', num: 19, time: '21 de jan, 17:15' },
                { type: 'video', num: 20, time: '21 de jan, 16:43' },
                { type: 'image', num: 20, time: '21 de jan, 15:58' },
                { type: 'video', num: 21, time: '21 de jan, 14:30' },
                { type: 'image', num: 21, time: '21 de jan, 13:55' },
                { type: 'video', num: 22, time: '21 de jan, 12:50' },
                { type: 'image', num: 22, time: '21 de jan, 11:25' },
                { type: 'video', num: 23, time: '21 de jan, 10:32' },
                { type: 'image', num: 23, time: '21 de jan, 09:20' },
                { type: 'video', num: 24, time: '21 de jan, 08:45' },
                { type: 'image', num: 24, time: '21 de jan, 07:30' },
                { type: 'video', num: 25, time: '21 de jan, 06:15' },
                { type: 'image', num: 25, time: '20 de jan, 23:40' },
                { type: 'video', num: 26, time: '20 de jan, 22:35' },
                { type: 'image', num: 26, time: '20 de jan, 21:50' },
                { type: 'video', num: 27, time: '20 de jan, 20:25' },
                { type: 'image', num: 27, time: '20 de jan, 19:42' },
                { type: 'video', num: 28, time: '20 de jan, 18:30' },
                { type: 'image', num: 28, time: '20 de jan, 17:25' },
                { type: 'video', num: 29, time: '20 de jan, 16:53' },
                { type: 'image', num: 29, time: '20 de jan, 15:20' },
                { type: 'video', num: 30, time: '20 de jan, 14:40' },
                { type: 'image', num: 30, time: '20 de jan, 13:35' },
                { type: 'video', num: 31, time: '20 de jan, 12:22' },
                { type: 'image', num: 31, time: '20 de jan, 11:15' },
                { type: 'video', num: 32, time: '20 de jan, 10:00' },
                { type: 'image', num: 32, time: '20 de jan, 09:18' },
                { type: 'video', num: 33, time: '20 de jan, 08:25' },
                { type: 'image', num: 33, time: '20 de jan, 07:40' },
                { type: 'video', num: 34, time: '19 de jan, 23:50' },
                { type: 'image', num: 34, time: '19 de jan, 22:45' },
                { type: 'video', num: 35, time: '19 de jan, 21:35' },
                { type: 'image', num: 35, time: '19 de jan, 20:22' },
                { type: 'video', num: 36, time: '19 de jan, 19:10' },
                { type: 'image', num: 36, time: '19 de jan, 18:05' },
                { type: 'video', num: 37, time: '19 de jan, 17:33' },
                { type: 'image', num: 37, time: '19 de jan, 16:50' },
                { type: 'video', num: 38, time: '19 de jan, 15:20' },
                { type: 'image', num: 38, time: '19 de jan, 14:45' },
                { type: 'video', num: 39, time: '19 de jan, 13:12' },
                { type: 'image', num: 39, time: '19 de jan, 12:00' },
                { type: 'video', num: 40, time: '19 de jan, 11:28' },
                { type: 'image', num: 40, time: '19 de jan, 10:15' },
                { type: 'video', num: 41, time: '19 de jan, 09:35' },
                { type: 'image', num: 41, time: '19 de jan, 08:50' },
                { type: 'video', num: 42, time: '19 de jan, 07:22' },
                { type: 'image', num: 42, time: '18 de jan, 23:30' },
                { type: 'video', num: 43, time: '18 de jan, 22:55' },
                { type: 'image', num: 43, time: '18 de jan, 21:45' },
                { type: 'video', num: 44, time: '18 de jan, 20:32' },
                { type: 'image', num: 44, time: '18 de jan, 19:20' },
                { type: 'video', num: 45, time: '18 de jan, 18:15' },
                { type: 'image', num: 45, time: '18 de jan, 17:43' },
                { type: 'video', num: 46, time: '18 de jan, 16:30' },
                { type: 'image', num: 46, time: '18 de jan, 15:55' },
                { type: 'video', num: 47, time: '18 de jan, 14:22' },
                { type: 'image', num: 47, time: '18 de jan, 13:10' },
                { type: 'video', num: 48, time: '18 de jan, 12:38' },
                { type: 'image', num: 48, time: '18 de jan, 11:25' },
                { type: 'video', num: 49, time: '18 de jan, 10:45' },
                { type: 'image', num: 49, time: '18 de jan, 09:20' },
                { type: 'video', num: 50, time: '18 de jan, 08:32' },
                { type: 'image', num: 50, time: '18 de jan, 07:15' },
              ].map((post, idx) => (
                <article key={idx} className="p-5 bg-[#2a2a2a]/90 rounded-3xl border border-amber-500/10 shadow-2xl flex flex-col gap-4">
                  <header className="flex items-center gap-3">
                    <img src="https://filesjon.zapsafe.work/loira/fotos/perfildoprivacy.png" alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <strong className="block text-lg text-white">Gi Campos</strong>
                      <span className="text-gray-400 text-sm">@gicampos1</span>
                    </div>
                    <time className="ml-auto text-gray-400 text-xs">{post.time}</time>
                  </header>
                  {post.type === 'video' ? (
                    <LazyVideo src={`https://filesjon.zapsafe.work/loira/videos/${post.num}.mp4`} />
                  ) : (
                    <LazyImage src={`https://filesjon.zapsafe.work/loira/fotos/${post.num}.jpg`} alt="" />
                  )}
                </article>
              ))}

              <div className="flex justify-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
