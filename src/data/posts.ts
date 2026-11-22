interface Props {
  title: string
  date: Date
  categories: readonly string[] // existing categories: 'publication' | 'award' | 'position' | 'news' (colors defined in categoryColors, src/components/NewsCard.tsx — add a color there if you introduce a new category)
  summary: string
  contentMdFilePath?: string // Add path to markdown file if exists. Path should be relative to /public/posts/
  pdfFilePath?: string // Add path to PDF file if exists. Path should be relative to /public/docs/
  endsAt?: Date // Add if the post has a deadline
}
// temp
export interface Post extends Props {}
export class Post {
  constructor(attrs: Props) {
    Object.assign(this, attrs)
  }
}

export const POSTS: Post[] = [
  {
    title: 'Open Position: Master’s Thesis / Quarter-Long Project on Embodied AI',
    date: new Date('2026-11-21T12:00:00'),
    categories: ['position'],
    summary:
      'We are looking for a motivated Master’s or Bachelor’s student to join CORSA Lab for a Master’s thesis or quarter-long project on **Efficient Inference for Embodied AI Agents** (innovative caching and GPU memory management at the intersection of AI systems and robotics).',
    contentMdFilePath: 'embodied-ai-masters-thesis-project.md',
    pdfFilePath: 'embodied-ai-masters-thesis-project.pdf',
  },
  {
    title: "CARMA paper accepted by ISLPED'23",
    date: new Date('2023-05-16'),
    categories: ['publication'],
    summary:
      '"CARMA: Context-Aware Runtime Reconfiguration for Energy-Efficient Sensor Fusion" has been accepted to ISLPED\'23. Authors: Yifan Zhang, Arnav Vaibhav Malawade, Xiaofang Zhang, Yuhui Li, DongHwan Seong, Mohammad Abdullah Al Faruque, and Sitao Huang. A collaboration between CORSA Lab and Prof. Al Faruque\'s group.',
  },
  {
    title: 'Prof. Sitao Huang was selected as a DARPA Riser',
    date: new Date('2022-07-26'),
    categories: ['award'],
    summary: 'CORSA Lab director Prof. Sitao Huang was selected as a DARPA Riser (2022 class).',
  },
] as const satisfies Post[]

POSTS.sort((a, b) => b.date.getTime() - a.date.getTime())
