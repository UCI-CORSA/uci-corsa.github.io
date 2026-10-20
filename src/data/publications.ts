import { MEMBERS, Member } from './members'

export const PublicationTypes = ['Conference', 'Poster', 'Workshop', 'Journal', 'Preprint'] as const
export type PublicationType = (typeof PublicationTypes)[number]

// `icon` is a file name under public/images/topics/
export const ResearchTopics = {
  compiler: { icon: 'compiler.svg', label: 'Compiler' },
  fpga: { icon: 'fpga.svg', label: 'FPGA' },
  'dnn-accelerators': { icon: 'dnn-accelerators.svg', label: 'DNN Accelerators' },
  quantization: { icon: 'quantization.svg', label: 'Quantization' },
  'heterogeneous-computing': { icon: 'heterogeneous-computing.svg', label: 'Heterogeneous Computing' },
  characterization: { icon: 'characterization.svg', label: 'Characterization' },
}
export type ResearchTopicType = keyof typeof ResearchTopics

export enum PublicationLinkType {
  PDF = 'PDF',
  SLI = 'Slides',
  POS = 'Poster',
  ACM = 'ACM DL',
  WEB = 'Website',
  VID = 'Video',
  TRA = 'Trailer',
  ARX = 'arXiv',
  COD = 'Code',
}

interface Props {
  title: string
  authors: (Member | string)[]
  year: number
  venue: string
  topics: ResearchTopicType[]
  type: PublicationType
  award?: string
  links?: { url: string; type: PublicationLinkType }[]
}

export interface Publication extends Props {}
export class Publication {
  constructor(attrs: Props) {
    Object.assign(this, attrs)
  }
}

export const PUBLICATIONS: Publication[] = [
  {
    title:
      'PD-Swap: Prefill-Decode Logic Swapping for End-to-End LLM Inference on Edge FPGAs via Dynamic Partial Reconfiguration',
    authors: [MEMBERS.yifanzhang, MEMBERS.zhihengchen, MEMBERS.yeqiao, MEMBERS.sitaohuang],
    venue: 'DAC',
    year: 2026,
    topics: ['fpga', 'dnn-accelerators'],
    type: 'Conference',
    links: [{ url: 'https://arxiv.org/pdf/2512.11550', type: PublicationLinkType.PDF }],
  },
  {
    title: 'Characterizing State Space Model and Hybrid Language Model Performance with Long Context',
    authors: [MEMBERS.saptarshimitra, MEMBERS.rachidkarami, MEMBERS.haochengxu, MEMBERS.sitaohuang, 'Hyoukjun Kwon'],
    venue: 'ISPASS',
    year: 2026,
    topics: ['characterization'],
    type: 'Conference',
    links: [
      { url: 'https://arxiv.org/pdf/2507.12442', type: PublicationLinkType.PDF },
      { url: 'https://github.com/sapmitra/SSM-Scope', type: PublicationLinkType.COD },
      { url: 'https://sapmitra.github.io/ssm-scope/', type: PublicationLinkType.WEB },
    ],
  },
  {
    title:
      'EdgeDAE: Acceleration of Diffusion Action Experts for Real-Time Physical AI with Tiny VLAs on Edge FPGA-GPU Systems',
    authors: [MEMBERS.zhihengchen, MEMBERS.yeqiao, 'Mohammad Abdullah Al Faruque', MEMBERS.sitaohuang],
    venue: 'ASP-DAC',
    year: 2027,
    topics: ['fpga', 'heterogeneous-computing'],
    type: 'Conference',
    links: [{ url: 'https://arxiv.org/pdf/2610.00311', type: PublicationLinkType.PDF }],
  },
  {
    title:
      'RaReCache: Bridging the Gap in Cross-Model KV Cache Reuse via Rank disagreement-based Selective Recomputation',
    authors: ['Sreetama Sarkar', MEMBERS.saptarshimitra, MEMBERS.sitaohuang, 'Souvik Kundu', 'Peter A. Beerel'],
    venue: 'arXiv',
    year: 2026,
    topics: [],
    type: 'Preprint',
    links: [{ url: 'https://arxiv.org/pdf/2610.11358', type: PublicationLinkType.PDF }],
  },
  {
    title: 'Structure-augmented LLMs for High-Level Synthesis Pragma Optimization',
    authors: [
      MEMBERS.haochengxu,
      MEMBERS.yeqiao,
      'Phyo Pyae Moe Aung',
      'Alok Mishra',
      'Pavana Prakash',
      'Rolando Pablo Hong Enriquez',
      'Adam Han Wu',
      MEMBERS.zhihengchen,
      'Dejan Milojicic',
      MEMBERS.sitaohuang,
    ],
    venue: 'MLCAD',
    year: 2026,
    topics: ['compiler', 'fpga'],
    type: 'Conference',
    links: [{ url: 'https://arxiv.org/pdf/2609.38601', type: PublicationLinkType.PDF }],
  },
  {
    title: 'Bern2Edge: A Neurosymbolic Compiler for Edge Deployment via Bernstein Polynomial Networks',
    authors: ['Malak Gamal El-Din', MEMBERS.yifanzhang, 'Yasser Shoukry', MEMBERS.sitaohuang, 'Salma Elmalaki'],
    venue: 'CODES+ISSS (TCAD)',
    year: 2026,
    topics: ['compiler'],
    type: 'Conference',
    links: [{ url: 'https://arxiv.org/pdf/2608.20497', type: PublicationLinkType.PDF }],
  },
  {
    title: 'LowRank-SSM: Hardware-Software Co-Design for Rank-Reduced Mamba Acceleration on FPGA',
    authors: [
      MEMBERS.haochengxu,
      MEMBERS.bhardwajbhat,
      MEMBERS.yuanchou,
      MEMBERS.zhihengchen,
      'Leyao Han',
      MEMBERS.yifanzhang,
      MEMBERS.yeqiao,
      MEMBERS.saptarshimitra,
      MEMBERS.sitaohuang,
    ],
    venue: 'arXiv',
    year: 2026,
    topics: ['fpga', 'dnn-accelerators'],
    type: 'Preprint',
    links: [{ url: 'https://arxiv.org/pdf/2608.02954', type: PublicationLinkType.PDF }],
  },
  {
    title: 'MOSAIC: Efficient Mixture-of-Agent Scheduling via Adaptive Aggregation and Inference Concurrency',
    authors: [
      MEMBERS.saptarshimitra,
      MEMBERS.yifanzhang,
      MEMBERS.rachidkarami,
      'Phyo Pyae Moe Aung',
      'Nazmul Takbir',
      'Sreetama Sarkar',
      'Souvik Kundu',
      MEMBERS.sitaohuang,
    ],
    venue: 'arXiv',
    year: 2026,
    topics: ['heterogeneous-computing'],
    type: 'Preprint',
    links: [{ url: 'https://arxiv.org/pdf/2606.03014', type: PublicationLinkType.PDF }],
  },
  {
    title: 'FASQ: Flexible Accelerated Subspace Quantization for Calibration-Free LLM Compression',
    authors: [MEMBERS.yeqiao, 'Yian Wang', MEMBERS.zhihengchen, 'Hyoukjun Kwon', MEMBERS.sitaohuang],
    venue: 'arXiv',
    year: 2026,
    topics: ['quantization'],
    type: 'Preprint',
    links: [{ url: 'https://arxiv.org/pdf/2605.04084', type: PublicationLinkType.PDF }],
  },
  {
    title: 'HARK: Hierarchical Agentic Retrieval with Keyframing for Video Understanding (Student Abstract)',
    authors: ['Jingcheng Li', MEMBERS.yeqiao, MEMBERS.sitaohuang],
    venue: 'AAAI',
    year: 2026,
    topics: [],
    type: 'Poster',
  },
  {
    title:
      'APEX-Q: Arbitrary-dimension Product-EXtension Quantization for Accelerated LLM Deployment (Student Abstract)',
    authors: ['Yian Wang', MEMBERS.yeqiao, MEMBERS.sitaohuang, 'Hyoukjun Kwon'],
    venue: 'AAAI',
    year: 2026,
    topics: ['quantization'],
    type: 'Poster',
  },
  {
    title:
      'Q-ROAR: Outlier-Aware Rescaling for RoPE Position Interpolation in Quantized Long-Context LLMs (Student Abstract)',
    authors: [MEMBERS.yeqiao, MEMBERS.sitaohuang],
    venue: 'AAAI',
    year: 2026,
    topics: ['quantization'],
    type: 'Poster',
    links: [{ url: 'https://arxiv.org/pdf/2509.14391', type: PublicationLinkType.PDF }],
  },
  {
    title:
      'TeLLMe: An Efficient End-to-End Ternary LLM Prefill and Decode Accelerator with Table-Lookup Matmul on Edge FPGAs',
    authors: [MEMBERS.yeqiao, MEMBERS.zhihengchen, MEMBERS.yifanzhang, 'Yian Wang', MEMBERS.sitaohuang],
    venue: 'FPGA',
    year: 2026,
    topics: ['fpga', 'dnn-accelerators', 'quantization'],
    type: 'Conference',
    links: [{ url: 'https://arxiv.org/pdf/2510.15926', type: PublicationLinkType.PDF }],
  },
  {
    title: 'Rethinking RoPE Scaling in Quantized LLM: Theory, Outlier, and Channel-Band Analysis with Weight Rescaling',
    authors: [MEMBERS.yeqiao, MEMBERS.haochengxu, 'Xiaofan Zhang', MEMBERS.sitaohuang],
    venue: 'arXiv',
    year: 2025,
    topics: ['quantization'],
    type: 'Preprint',
    links: [{ url: 'https://arxiv.org/pdf/2510.00028', type: PublicationLinkType.PDF }],
  },
  {
    title: 'Cobra: Algorithm-Architecture Co-optimized Binary Transformer Accelerator for Edge Inference',
    authors: [MEMBERS.yeqiao, MEMBERS.zhihengchen, 'Yian Wang', MEMBERS.yifanzhang, 'Yunzhe Deng', MEMBERS.sitaohuang],
    venue: 'ICCAD',
    year: 2025,
    topics: ['fpga', 'dnn-accelerators', 'quantization'],
    type: 'Conference',
    links: [{ url: 'https://arxiv.org/pdf/2504.16269', type: PublicationLinkType.PDF }],
  },
  {
    title:
      'A Sparsity-Aware Autonomous Path Planning Accelerator with HW/SW Co-Design and Multi-Level Dataflow Optimization',
    authors: [
      MEMBERS.yifanzhang,
      'Xiaoyu Niu',
      MEMBERS.hongzhengtian,
      'Yanjun Zhang',
      'Bo Yu',
      'Shaoshan Liu',
      MEMBERS.sitaohuang,
    ],
    venue: 'ACM TACO',
    year: 2025,
    topics: ['fpga', 'dnn-accelerators'],
    type: 'Journal',
    links: [{ url: 'https://arxiv.org/pdf/2507.16177', type: PublicationLinkType.PDF }],
  },
  {
    title:
      'RSEND: Retinex-based Squeeze and Excitation Network with Dark Region Detection for Efficient Low Light Image Enhancement',
    authors: ['Jingcheng Li', MEMBERS.yeqiao, MEMBERS.haochengxu, MEMBERS.sitaohuang],
    venue: 'IJCNN',
    year: 2025,
    topics: [],
    type: 'Conference',
    links: [{ url: 'https://arxiv.org/pdf/2406.09656', type: PublicationLinkType.PDF }],
  },
  {
    title: 'MONAS: Efficient Zero-Shot Neural Architecture Search for MCUs',
    authors: [MEMBERS.yeqiao, MEMBERS.haochengxu, MEMBERS.yifanzhang, MEMBERS.sitaohuang],
    venue: 'IJCNN',
    year: 2025,
    topics: [],
    type: 'Conference',
    links: [{ url: 'https://arxiv.org/pdf/2408.15034', type: PublicationLinkType.PDF }],
  },
  {
    title: 'SSDTrain: An Activation Offloading Framework to SSDs for Faster Large Language Model Training',
    authors: [
      'Kun Wu',
      'Jeongmin Brian Park',
      'Xiaofan Zhang',
      'Mert Hidayetoğlu',
      'Vikram Sharma Mailthody',
      MEMBERS.sitaohuang,
      'Steve Lumetta',
      'Wen-mei Hwu',
    ],
    venue: 'DAC',
    year: 2025,
    topics: ['heterogeneous-computing'],
    type: 'Conference',
    links: [{ url: 'https://arxiv.org/pdf/2408.10013', type: PublicationLinkType.PDF }],
  },
  {
    title: 'HeteroBench: Multi-kernel Benchmarks for Heterogeneous Systems',
    authors: [
      MEMBERS.hongzhengtian,
      'Alok Mishra',
      MEMBERS.zhihengchen,
      'Rolando P. Hong Enriquez',
      'Dejan Milojicic',
      'Eitan Frachtenberg',
      MEMBERS.sitaohuang,
    ],
    venue: 'ICPE',
    year: 2025,
    topics: ['heterogeneous-computing', 'characterization'],
    type: 'Conference',
  },
  {
    title: 'NeuSym-HLS: Learning-Driven Symbolic Distillation in High-Level Synthesis of Hardware Accelerators',
    authors: ['Chung-Mou Pan', 'Salma Elmalaki', 'Yasser Shoukry', MEMBERS.sitaohuang],
    venue: 'Machine Learning for Systems 2025',
    year: 2025,
    topics: ['compiler', 'fpga'],
    type: 'Workshop',
  },
  {
    title: 'A Sparsity-Aware Autonomous Path Planning Accelerator with Algorithm-Architecture Co-Design',
    authors: [
      'Yanjun Zhang',
      'Xiaoyu Niu',
      MEMBERS.yifanzhang,
      MEMBERS.hongzhengtian,
      'Bo Yu',
      'Shaoshan Liu',
      MEMBERS.sitaohuang,
    ],
    venue: 'ICCAD',
    year: 2024,
    topics: ['fpga', 'dnn-accelerators'],
    type: 'Conference',
  },
  {
    title: 'Optimized Spatial Architecture Mapping Flow for Transformer Accelerators',
    authors: [
      MEMBERS.haochengxu,
      MEMBERS.faraztahmasebi,
      MEMBERS.yeqiao,
      MEMBERS.hongzhengtian,
      'Hyoukjun Kwon',
      MEMBERS.sitaohuang,
    ],
    venue: 'arXiv',
    year: 2024,
    topics: ['dnn-accelerators', 'compiler'],
    type: 'Preprint',
    links: [{ url: 'https://arxiv.org/pdf/2410.07407', type: PublicationLinkType.PDF }],
  },
  {
    title: 'Optimizing High-Level Synthesis Designs with Retrieval-Augmented Large Language Models',
    authors: [MEMBERS.haochengxu, 'Haotian Hu', MEMBERS.sitaohuang],
    venue: 'LAD',
    year: 2024,
    topics: ['compiler', 'fpga'],
    type: 'Workshop',
  },
  {
    title:
      'Hector: An Efficient Programming and Compilation Framework for Implementing Relational Graph Neural Networks in GPU Architectures',
    authors: ['Kun Wu', 'Mert Hidayetoğlu', 'Xiang Song', MEMBERS.sitaohuang, 'Da Zheng', 'Israt Nisa', 'Wen-mei Hwu'],
    venue: 'ASPLOS',
    year: 2024,
    topics: ['compiler'],
    type: 'Conference',
    links: [{ url: 'https://arxiv.org/pdf/2301.06284', type: PublicationLinkType.PDF }],
  },
  {
    title: 'Accelerating Autonomous Path Planning on FPGAs with Sparsity-Aware HW/SW Co-Optimizations',
    authors: [
      'Xiaoyu Niu',
      'Yanjun Zhang',
      MEMBERS.yifanzhang,
      MEMBERS.hongzhengtian,
      'Bo Yu',
      'Shaoshan Liu',
      MEMBERS.sitaohuang,
    ],
    venue: 'FPGA',
    year: 2024,
    topics: ['fpga'],
    type: 'Poster',
  },
  {
    title:
      'TG-NAS: Generalizable Zero-Cost Proxies with Operator Description Embedding and Graph Learning for Efficient Neural Architecture Search',
    authors: [MEMBERS.yeqiao, 'Jingcheng Li', MEMBERS.haochengxu, MEMBERS.sitaohuang],
    venue: 'arXiv',
    year: 2024,
    topics: [],
    type: 'Preprint',
    links: [{ url: 'https://arxiv.org/pdf/2404.00271', type: PublicationLinkType.PDF }],
  },
  {
    title: 'MicroNAS: Zero-Shot Neural Architecture Search for MCUs',
    authors: [MEMBERS.yeqiao, MEMBERS.haochengxu, MEMBERS.yifanzhang, MEMBERS.sitaohuang],
    venue: 'DATE',
    year: 2024,
    topics: [],
    type: 'Conference',
    links: [{ url: 'https://arxiv.org/pdf/2401.08996', type: PublicationLinkType.PDF }],
  },
  {
    title: 'PyLog: An Algorithm-Centric Python-based FPGA Programming and Synthesis Flow',
    authors: [MEMBERS.sitaohuang, 'Kun Wu', 'Hyunmin Jeong', 'Chengyue Wang', 'Deming Chen', 'Wen-Mei Hwu'],
    venue: 'IEEE Transactions on Computers',
    year: 2021,
    topics: ['compiler', 'fpga'],
    type: 'Journal',
    links: [
      {
        url: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=9591456&tag=1',
        type: PublicationLinkType.PDF,
      },
    ],
  },
  {
    title: 'Mixed Precision Quantization for ReRAM-based DNN Inference Accelerators',
    authors: [
      MEMBERS.sitaohuang,
      'Aayush Ankit',
      'Plinio Silveira',
      'Rodrigo Antunes',
      'Sai Rahul Chalamalasetti',
      'Izzat El Hajj',
      'Dong-Eun Kim',
      'Glaucimar Aguiar',
      'Pedro Bruel',
      'Sergey Serebryakov',
      'Cong Xu',
      'Can Li',
      'Paolo Faraboschi',
      'John Paul Strachan',
      'Deming Chen',
      'Kaushik Roy',
      'Wen-mei Hwu',
      'Dejan Milojicic',
    ],
    venue: 'ASP-DAC 2021',
    year: 2021,
    topics: ['quantization', 'dnn-accelerators'],
    type: 'Conference',
    links: [
      {
        url: 'https://dl.acm.org/doi/pdf/10.1145/3394885.3431554',
        type: PublicationLinkType.PDF,
      },
    ],
  },
  {
    title: 'Accelerating Sparse Deep Neural Network on FPGA',
    authors: [MEMBERS.sitaohuang, 'Carl Pearson', 'Rakesh Nagi', 'Jinjun Xiong', 'Deming Chen', 'Wen-mei Hwu'],
    venue: 'HPEC 2019',
    year: 2019,
    topics: ['fpga', 'dnn-accelerators'],
    type: 'Conference',
    links: [
      {
        url: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=8916419',
        type: PublicationLinkType.PDF,
      },
    ],
  },
  {
    title: 'FPGA/DNN Co-Design: An Efficient Design Methodology for IoT Intelligence on the Edge',
    authors: [
      'Cong Hao',
      'Xiaofan Zhang',
      'Yuhong Li',
      MEMBERS.sitaohuang,
      'Jinjun Xiong',
      'Kyle Rupnow',
      'Wen-mei Hwu',
      'Deming Chen',
    ],
    venue: 'DAC 2019',
    year: 2019,
    topics: ['fpga', 'dnn-accelerators'],
    type: 'Conference',
    links: [
      {
        url: 'https://dl.acm.org/doi/pdf/10.1145/3316781.3317829',
        type: PublicationLinkType.PDF,
      },
    ],
  },
  {
    title: 'Analysis and Modeling of Collaborative Execution Strategies for Heterogeneous CPU-FPGA Architectures',
    authors: [
      MEMBERS.sitaohuang,
      'Li-Wen Chang',
      'Izzat El Hajj',
      'Simon Garcia de Gonzalo',
      'Juan Gómez Luna',
      'Sai Rahul Chalamalasetti',
      'Mohamed El-Hadedy',
      'Dejan Milojicic',
      'Onur Mutlu',
      'Deming Chen',
      'Wen-mei Hwu',
    ],
    venue: 'ICPE 2019',
    year: 2019,
    topics: ['heterogeneous-computing', 'fpga'],
    type: 'Conference',
    links: [
      {
        url: 'https://dl.acm.org/doi/pdf/10.1145/3297663.3310305',
        type: PublicationLinkType.PDF,
      },
    ],
  },
] as const satisfies Publication[]

export const PREPRINTS: Publication[] = PUBLICATIONS.filter(p => p.type === 'Preprint')
export const PUBLICATIONS_BY_YEAR: Record<string, Publication[]> = PUBLICATIONS.reduce(
  (acc, publication) => {
    if (publication.type === 'Preprint') return acc // skip preprints
    const yearKey = publication.year
    if (!acc[yearKey]) acc[yearKey] = [] as Publication[]
    acc[yearKey].push(publication)
    return acc
  },
  {} as Record<number, Publication[]>
)
