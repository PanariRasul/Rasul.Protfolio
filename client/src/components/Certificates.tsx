import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, FileText, Download, Loader2, ChevronDown, ChevronUp, FolderOpen } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { certificates as manualCerts, certificatesFolderId } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

/**
 * Certificates are loaded automatically from the public Google Drive folder
 * (server: /api/certificates). Add a PDF/image to the folder → it appears here within ~30 min.
 * If Drive isn't configured / reachable, the list in certificates.json is shown instead.
 */
type Cert = {
    id: string;
    name: string;
    thumbnail: string;
    preview?: string; // iframe URL (Drive)
    view?: string; // open in new tab
    download?: string;
    image?: string; // manual certs: direct image
};

const INITIAL = 6;

export default function Certificates() {
    const { t } = useI18n();
    const [items, setItems] = useState<Cert[] | null>(null);
    const [open, setOpen] = useState<Cert | null>(null);
    const [showAll, setShowAll] = useState(false);
    const folderUrl = certificatesFolderId ? `https://drive.google.com/drive/folders/${certificatesFolderId}` : "";

    useEffect(() => {
        const fallback: Cert[] = manualCerts.map((c, i) => ({
            id: `manual-${i}`,
            name: c.name,
            thumbnail: c.image,
            image: c.image,
            view: c.link || c.image,
        }));
        fetch("/api/certificates")
            .then((r) => (r.ok ? r.json() : Promise.reject()))
            .then((d) => setItems(d?.items?.length ? d.items : fallback))
            .catch(() => setItems(fallback));
    }, []);

    const list = items ?? [];
    const visible = showAll ? list : list.slice(0, INITIAL);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/10 rounded-lg"><Award className="w-5 h-5 text-primary" /></div>
                    <h3 className="text-xl font-bold">
                        {t("certs.title")} {items && <span className="text-sm font-normal text-muted-foreground ml-1">({list.length})</span>}
                    </h3>
                </div>
                {folderUrl && (
                    <a href={folderUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1.5">
                        <FolderOpen className="w-4 h-4" /> {t("certs.allDrive")}
                    </a>
                )}
            </div>

            {items === null ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="rounded-xl border border-border overflow-hidden">
                            <div className="h-40 bg-muted animate-pulse" />
                            <div className="p-4 space-y-2">
                                <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
                                <div className="h-3 bg-muted rounded animate-pulse w-1/3" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {visible.map((c, i) => (
                            <motion.button
                                key={c.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(i, 6) * 0.04 }}
                                onClick={() => setOpen(c)}
                                className="text-left group rounded-xl border border-border overflow-hidden bg-card/50 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 transition-all"
                            >
                                <div className="h-40 overflow-hidden bg-white relative">
                                    <Thumb src={c.thumbnail} alt={c.name} />
                                </div>
                                <div className="p-4">
                                    <p className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">{c.name}</p>
                                    <p className="text-xs text-primary mt-2 inline-flex items-center gap-1">
                                        <FileText className="w-3.5 h-3.5" /> {t("certs.view")} →
                                    </p>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {list.length > INITIAL && (
                        <div className="text-center mt-6">
                            <button
                                onClick={() => setShowAll((s) => !s)}
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border hover:border-primary hover:text-primary text-sm transition-colors"
                            >
                                {showAll ? <>{t("certs.showLess")} <ChevronUp className="w-4 h-4" /></> : <>{t("certs.showAll")} ({list.length}) <ChevronDown className="w-4 h-4" /></>}
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Viewer */}
            <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
                <DialogContent className="max-w-4xl w-[95vw] h-[88vh] flex flex-col gap-3 p-4">
                    <div className="flex items-center justify-between gap-3 pr-8">
                        <div className="min-w-0">
                            <DialogTitle className="truncate">{open?.name}</DialogTitle>
                            <DialogDescription className="sr-only">Certificate preview</DialogDescription>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            {open?.view && (
                                <a href={open.view} target="_blank" rel="noopener noreferrer" aria-label="Open in new tab" className="p-2 rounded-lg border border-border hover:text-primary">
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                            {open?.download && (
                                <a href={open.download} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm">
                                    <Download className="w-4 h-4" /> {t("resume.download")}
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 rounded-lg border border-border overflow-hidden bg-muted relative">
                        {open?.preview ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin text-primary absolute inset-0 m-auto" />
                                <iframe src={open.preview} title={open.name} allow="autoplay" className="relative w-full h-full bg-transparent" />
                            </>
                        ) : open?.image ? (
                            <img src={open.image} alt={open.name} className="w-full h-full object-contain" />
                        ) : null}
                    </div>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}

function Thumb({ src, alt }: { src: string; alt: string }) {
    const [failed, setFailed] = useState(false);
    if (!src || failed) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
                <Award className="w-10 h-10 text-primary" />
                <span className="text-xs">Certificate</span>
            </div>
        );
    }
    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />
    );
}