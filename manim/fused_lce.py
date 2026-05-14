from manim import (
    Create,
    DOWN,
    FadeIn,
    Rectangle,
    RIGHT,
    Scene,
    Text,
    UP,
    VGroup,
    Write,
    rate_functions,
)


class FusedLCE(Scene):
    def construct(self):
        self.camera.background_color = "#ffffff"
        ink = "#09090b"
        muted = "#71717a"
        accent = "#6366f1"

        Text.set_default(color=ink, font="Helvetica")

        title = Text("logits memory: baseline vs fused", font_size=28, color=ink)
        title.to_edge(UP, buff=0.8)

        # ---- baseline: full [N, V] block ----
        baseline_label = Text("baseline · [N x V]", font_size=18, color=muted)
        baseline = Rectangle(width=9.0, height=0.7, color=muted, fill_color=muted, fill_opacity=0.25, stroke_width=1.2)
        baseline_group = VGroup(baseline_label, baseline).arrange(DOWN, buff=0.15)
        baseline_group.next_to(title, DOWN, buff=0.8)

        # ---- fused: thin sliding chunk ----
        fused_label = Text("fused · [C x V] resident, streamed", font_size=18, color=muted)
        track = Rectangle(width=9.0, height=0.7, color=muted, fill_color="#f5f5f4", fill_opacity=0.6, stroke_width=1.2)
        chunk = Rectangle(width=1.1, height=0.7, color=accent, fill_color=accent, fill_opacity=0.85, stroke_width=0)
        chunk.move_to(track.get_left() + RIGHT * 0.55)
        fused_group = VGroup(fused_label, VGroup(track, chunk)).arrange(DOWN, buff=0.15)
        fused_group.next_to(baseline_group, DOWN, buff=0.8)

        # ---- bottom: peak memory readout ----
        readout = Text("peak  C x V  <<  N x V", font_size=22, color=ink)
        readout.next_to(fused_group, DOWN, buff=0.8)

        # ---- animate ----
        self.play(Write(title), run_time=0.6)
        self.play(FadeIn(baseline_label, shift=UP * 0.2), Create(baseline), run_time=0.7)
        self.play(FadeIn(fused_label, shift=UP * 0.2), Create(track), run_time=0.7)
        self.play(FadeIn(chunk, scale=0.8), run_time=0.3)

        # slide the chunk across the track in 8 steps
        step = 9.0 / 8
        for _ in range(8):
            self.play(chunk.animate.shift(RIGHT * step), run_time=0.28, rate_func=rate_functions.smooth)

        self.play(Write(readout), run_time=0.6)
        self.wait(0.8)
