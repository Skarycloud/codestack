// Open-weight models you can download and run locally, smallest to largest. Sizes, context windows and
// capabilities come from the Ollama library (default 4-bit quantization unless noted); licenses come from
// each model's own license file. Checked 2026-10-09.

export type ModelCapability = "vision" | "tools" | "thinking" | "audio" | "code"

export interface LocalModel {
  name: string
  family: string
  creator: string
  /** Parameter count as shown, e.g. "30B (3B active)" for mixture-of-experts models. */
  params: string
  /** Total parameters in billions, for sorting. */
  paramsB: number
  /** Active parameters per token in billions, for mixture-of-experts models. */
  activeB?: number
  /** Download size of the default quantization. */
  size: string
  sizeGB: number
  context: string
  license: string
  capabilities: ModelCapability[]
  description: string
  /** Pull and chat in one command with Ollama. */
  run: string
  url: string
}

export const localModels: LocalModel[] = [
  {
    "name": "SmolLM2 135M",
    "family": "SmolLM2",
    "creator": "Hugging Face",
    "params": "135M",
    "paramsB": 0.135,
    "size": "271 MB",
    "sizeGB": 0.27,
    "context": "8K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools"
    ],
    "description": "Tiny models that run almost anywhere.",
    "run": "ollama run smollm2:135m",
    "url": "https://ollama.com/library/smollm2:135m"
  },
  {
    "name": "Gemma 3 270M",
    "family": "Gemma 3",
    "creator": "Google",
    "params": "270M",
    "paramsB": 0.27,
    "size": "292 MB",
    "sizeGB": 0.29,
    "context": "32K",
    "license": "Gemma Terms of Use",
    "capabilities": [],
    "description": "Lightweight multimodal models that run on a single GPU.",
    "run": "ollama run gemma3:270m",
    "url": "https://ollama.com/library/gemma3:270m"
  },
  {
    "name": "Granite 4 350M",
    "family": "Granite 4",
    "creator": "IBM",
    "params": "350M",
    "paramsB": 0.35,
    "size": "708 MB",
    "sizeGB": 0.71,
    "context": "32K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools"
    ],
    "description": "Efficient hybrid models built for enterprise and edge.",
    "run": "ollama run granite4:350m",
    "url": "https://ollama.com/library/granite4:350m"
  },
  {
    "name": "SmolLM2 360M",
    "family": "SmolLM2",
    "creator": "Hugging Face",
    "params": "360M",
    "paramsB": 0.36,
    "size": "726 MB",
    "sizeGB": 0.73,
    "context": "8K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools"
    ],
    "description": "Tiny models that run almost anywhere.",
    "run": "ollama run smollm2:360m",
    "url": "https://ollama.com/library/smollm2:360m"
  },
  {
    "name": "Qwen2.5 Coder 0.5B",
    "family": "Qwen2.5 Coder",
    "creator": "Alibaba",
    "params": "0.5B",
    "paramsB": 0.5,
    "size": "398 MB",
    "sizeGB": 0.4,
    "context": "32K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "code"
    ],
    "description": "Code generation, reasoning and fixing in 40+ languages.",
    "run": "ollama run qwen2.5-coder:0.5b",
    "url": "https://ollama.com/library/qwen2.5-coder:0.5b"
  },
  {
    "name": "Qwen 3 0.6B",
    "family": "Qwen 3",
    "creator": "Alibaba",
    "params": "0.6B",
    "paramsB": 0.6,
    "size": "523 MB",
    "sizeGB": 0.52,
    "context": "40K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "Dense and MoE models with switchable thinking.",
    "run": "ollama run qwen3:0.6b",
    "url": "https://ollama.com/library/qwen3:0.6b"
  },
  {
    "name": "Qwen 3.5 0.8B",
    "family": "Qwen 3.5",
    "creator": "Alibaba",
    "params": "0.8B",
    "paramsB": 0.8,
    "size": "1.2 GB",
    "sizeGB": 1.2,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "A full family from tiny to huge, multimodal with thinking.",
    "run": "ollama run qwen3.5:0.8b",
    "url": "https://ollama.com/library/qwen3.5:0.8b"
  },
  {
    "name": "Gemma 3 1B",
    "family": "Gemma 3",
    "creator": "Google",
    "params": "1B",
    "paramsB": 1,
    "size": "806 MB",
    "sizeGB": 0.81,
    "context": "32K",
    "license": "Gemma Terms of Use",
    "capabilities": [],
    "description": "Lightweight multimodal models that run on a single GPU.",
    "run": "ollama run gemma3:1b",
    "url": "https://ollama.com/library/gemma3:1b"
  },
  {
    "name": "Llama 3.2 1B",
    "family": "Llama 3.2",
    "creator": "Meta",
    "params": "1B",
    "paramsB": 1,
    "size": "1.3 GB",
    "sizeGB": 1.3,
    "context": "128K",
    "license": "Llama 3.2 Community License",
    "capabilities": [
      "tools"
    ],
    "description": "Small models for on-device chat, summaries and tools.",
    "run": "ollama run llama3.2:1b",
    "url": "https://ollama.com/library/llama3.2:1b"
  },
  {
    "name": "Falcon 3 1B",
    "family": "Falcon 3",
    "creator": "TII",
    "params": "1B",
    "paramsB": 1,
    "size": "1.8 GB",
    "sizeGB": 1.8,
    "context": "8K",
    "license": "Falcon 3 TII License",
    "capabilities": [],
    "description": "Small, efficient models from the Technology Innovation Institute.",
    "run": "ollama run falcon3:1b",
    "url": "https://ollama.com/library/falcon3:1b"
  },
  {
    "name": "Granite 4 1B",
    "family": "Granite 4",
    "creator": "IBM",
    "params": "1B",
    "paramsB": 1,
    "size": "3.3 GB",
    "sizeGB": 3.3,
    "context": "128K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools"
    ],
    "description": "Efficient hybrid models built for enterprise and edge.",
    "run": "ollama run granite4:1b",
    "url": "https://ollama.com/library/granite4:1b"
  },
  {
    "name": "TinyLlama 1.1B",
    "family": "TinyLlama",
    "creator": "TinyLlama project",
    "params": "1.1B",
    "paramsB": 1.1,
    "size": "638 MB",
    "sizeGB": 0.64,
    "context": "2K",
    "license": "Apache 2.0",
    "capabilities": [],
    "description": "A compact 1.1B model trained on 3 trillion tokens.",
    "run": "ollama run tinyllama:1.1b",
    "url": "https://ollama.com/library/tinyllama:1.1b"
  },
  {
    "name": "LFM2.5 Thinking 1.2B",
    "family": "LFM2.5 Thinking",
    "creator": "Liquid AI",
    "params": "1.2B",
    "paramsB": 1.2,
    "size": "731 MB",
    "sizeGB": 0.73,
    "context": "125K",
    "license": "LFM Open License",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "A tiny reasoning model built for on-device use.",
    "run": "ollama run lfm2.5-thinking:1.2b",
    "url": "https://ollama.com/library/lfm2.5-thinking:1.2b"
  },
  {
    "name": "Qwen2.5 Coder 1.5B",
    "family": "Qwen2.5 Coder",
    "creator": "Alibaba",
    "params": "1.5B",
    "paramsB": 1.5,
    "size": "986 MB",
    "sizeGB": 0.99,
    "context": "32K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "code"
    ],
    "description": "Code generation, reasoning and fixing in 40+ languages.",
    "run": "ollama run qwen2.5-coder:1.5b",
    "url": "https://ollama.com/library/qwen2.5-coder:1.5b"
  },
  {
    "name": "DeepSeek-R1 1.5B",
    "family": "DeepSeek-R1",
    "creator": "DeepSeek",
    "params": "1.5B",
    "paramsB": 1.5,
    "size": "1.1 GB",
    "sizeGB": 1.1,
    "context": "128K",
    "license": "MIT",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "Open reasoning models, from small distills to the full 671B.",
    "run": "ollama run deepseek-r1:1.5b",
    "url": "https://ollama.com/library/deepseek-r1:1.5b"
  },
  {
    "name": "Qwen 3 1.7B",
    "family": "Qwen 3",
    "creator": "Alibaba",
    "params": "1.7B",
    "paramsB": 1.7,
    "size": "1.4 GB",
    "sizeGB": 1.4,
    "context": "40K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "Dense and MoE models with switchable thinking.",
    "run": "ollama run qwen3:1.7b",
    "url": "https://ollama.com/library/qwen3:1.7b"
  },
  {
    "name": "SmolLM2 1.7B",
    "family": "SmolLM2",
    "creator": "Hugging Face",
    "params": "1.7B",
    "paramsB": 1.7,
    "size": "1.8 GB",
    "sizeGB": 1.8,
    "context": "8K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools"
    ],
    "description": "Tiny models that run almost anywhere.",
    "run": "ollama run smollm2:1.7b",
    "url": "https://ollama.com/library/smollm2:1.7b"
  },
  {
    "name": "Moondream 1.8B",
    "family": "Moondream",
    "creator": "Moondream",
    "params": "1.8B",
    "paramsB": 1.8,
    "size": "1.7 GB",
    "sizeGB": 1.7,
    "context": "2K",
    "license": "Apache 2.0",
    "capabilities": [
      "vision"
    ],
    "description": "A tiny vision model for edge devices.",
    "run": "ollama run moondream:1.8b",
    "url": "https://ollama.com/library/moondream:1.8b"
  },
  {
    "name": "Qwen3 VL 2B",
    "family": "Qwen3 VL",
    "creator": "Alibaba",
    "params": "2B",
    "paramsB": 2,
    "size": "1.9 GB",
    "sizeGB": 1.9,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "Vision-language models for images, documents and video.",
    "run": "ollama run qwen3-vl:2b",
    "url": "https://ollama.com/library/qwen3-vl:2b"
  },
  {
    "name": "Qwen 3.5 2B",
    "family": "Qwen 3.5",
    "creator": "Alibaba",
    "params": "2B",
    "paramsB": 2,
    "size": "2.7 GB",
    "sizeGB": 2.7,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "A full family from tiny to huge, multimodal with thinking.",
    "run": "ollama run qwen3.5:2b",
    "url": "https://ollama.com/library/qwen3.5:2b"
  },
  {
    "name": "Gemma 4 E2B",
    "family": "Gemma 4",
    "creator": "Google",
    "params": "E2B",
    "paramsB": 2,
    "size": "4.6 GB",
    "sizeGB": 4.6,
    "context": "128K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "Google's newest open models with vision, audio, tools and thinking.",
    "run": "ollama run gemma4:e2b",
    "url": "https://ollama.com/library/gemma4:e2b"
  },
  {
    "name": "Gemma 3n E2B",
    "family": "Gemma 3n",
    "creator": "Google",
    "params": "E2B",
    "paramsB": 2,
    "size": "5.6 GB",
    "sizeGB": 5.6,
    "context": "32K",
    "license": "Gemma Terms of Use",
    "capabilities": [],
    "description": "Built for phones and laptops: big-model quality in a small memory footprint.",
    "run": "ollama run gemma3n:e2b",
    "url": "https://ollama.com/library/gemma3n:e2b"
  },
  {
    "name": "StarCoder2 3B",
    "family": "StarCoder2",
    "creator": "BigCode",
    "params": "3B",
    "paramsB": 3,
    "size": "1.7 GB",
    "sizeGB": 1.7,
    "context": "16K",
    "license": "BigCode OpenRAIL-M",
    "capabilities": [
      "code"
    ],
    "description": "Transparent code models trained on The Stack v2.",
    "run": "ollama run starcoder2:3b",
    "url": "https://ollama.com/library/starcoder2:3b"
  },
  {
    "name": "Qwen2.5 Coder 3B",
    "family": "Qwen2.5 Coder",
    "creator": "Alibaba",
    "params": "3B",
    "paramsB": 3,
    "size": "1.9 GB",
    "sizeGB": 1.9,
    "context": "32K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "code"
    ],
    "description": "Code generation, reasoning and fixing in 40+ languages.",
    "run": "ollama run qwen2.5-coder:3b",
    "url": "https://ollama.com/library/qwen2.5-coder:3b"
  },
  {
    "name": "Llama 3.2 3B",
    "family": "Llama 3.2",
    "creator": "Meta",
    "params": "3B",
    "paramsB": 3,
    "size": "2.0 GB",
    "sizeGB": 2,
    "context": "128K",
    "license": "Llama 3.2 Community License",
    "capabilities": [
      "tools"
    ],
    "description": "Small models for on-device chat, summaries and tools.",
    "run": "ollama run llama3.2:3b",
    "url": "https://ollama.com/library/llama3.2:3b"
  },
  {
    "name": "Hermes 3 3B",
    "family": "Hermes 3",
    "creator": "Nous Research",
    "params": "3B",
    "paramsB": 3,
    "size": "2.0 GB",
    "sizeGB": 2,
    "context": "128K",
    "license": "Llama 3 Community License",
    "capabilities": [
      "tools"
    ],
    "description": "Steerable, role-play friendly fine-tunes of Llama.",
    "run": "ollama run hermes3:3b",
    "url": "https://ollama.com/library/hermes3:3b"
  },
  {
    "name": "Falcon 3 3B",
    "family": "Falcon 3",
    "creator": "TII",
    "params": "3B",
    "paramsB": 3,
    "size": "2.0 GB",
    "sizeGB": 2,
    "context": "32K",
    "license": "Falcon 3 TII License",
    "capabilities": [],
    "description": "Small, efficient models from the Technology Innovation Institute.",
    "run": "ollama run falcon3:3b",
    "url": "https://ollama.com/library/falcon3:3b"
  },
  {
    "name": "Granite 4 3B",
    "family": "Granite 4",
    "creator": "IBM",
    "params": "3B",
    "paramsB": 3,
    "size": "2.1 GB",
    "sizeGB": 2.1,
    "context": "128K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools"
    ],
    "description": "Efficient hybrid models built for enterprise and edge.",
    "run": "ollama run granite4:3b",
    "url": "https://ollama.com/library/granite4:3b"
  },
  {
    "name": "Cogito 3B",
    "family": "Cogito",
    "creator": "Deep Cogito",
    "params": "3B",
    "paramsB": 3,
    "size": "2.2 GB",
    "sizeGB": 2.2,
    "context": "128K",
    "license": "Llama and Qwen licenses",
    "capabilities": [
      "tools"
    ],
    "description": "Hybrid reasoning models that can answer directly or think first.",
    "run": "ollama run cogito:3b",
    "url": "https://ollama.com/library/cogito:3b"
  },
  {
    "name": "Ministral 3 3B",
    "family": "Ministral 3",
    "creator": "Mistral AI",
    "params": "3B",
    "paramsB": 3,
    "size": "3.0 GB",
    "sizeGB": 3,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "vision"
    ],
    "description": "Edge models with vision and tools.",
    "run": "ollama run ministral-3:3b",
    "url": "https://ollama.com/library/ministral-3:3b"
  },
  {
    "name": "Phi-4 mini 3.8B",
    "family": "Phi-4 mini",
    "creator": "Microsoft",
    "params": "3.8B",
    "paramsB": 3.8,
    "size": "2.5 GB",
    "sizeGB": 2.5,
    "context": "128K",
    "license": "MIT",
    "capabilities": [
      "tools"
    ],
    "description": "Compact, multilingual, with function calling.",
    "run": "ollama run phi4-mini:3.8b",
    "url": "https://ollama.com/library/phi4-mini:3.8b"
  },
  {
    "name": "Qwen 3 4B",
    "family": "Qwen 3",
    "creator": "Alibaba",
    "params": "4B",
    "paramsB": 4,
    "size": "2.5 GB",
    "sizeGB": 2.5,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "Dense and MoE models with switchable thinking.",
    "run": "ollama run qwen3:4b",
    "url": "https://ollama.com/library/qwen3:4b"
  },
  {
    "name": "Qwen 3.5 4B",
    "family": "Qwen 3.5",
    "creator": "Alibaba",
    "params": "4B",
    "paramsB": 4,
    "size": "3.3 GB",
    "sizeGB": 3.3,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "A full family from tiny to huge, multimodal with thinking.",
    "run": "ollama run qwen3.5:4b",
    "url": "https://ollama.com/library/qwen3.5:4b"
  },
  {
    "name": "Qwen3 VL 4B",
    "family": "Qwen3 VL",
    "creator": "Alibaba",
    "params": "4B",
    "paramsB": 4,
    "size": "3.3 GB",
    "sizeGB": 3.3,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "Vision-language models for images, documents and video.",
    "run": "ollama run qwen3-vl:4b",
    "url": "https://ollama.com/library/qwen3-vl:4b"
  },
  {
    "name": "Gemma 3 4B",
    "family": "Gemma 3",
    "creator": "Google",
    "params": "4B",
    "paramsB": 4,
    "size": "3.4 GB",
    "sizeGB": 3.4,
    "context": "128K",
    "license": "Gemma Terms of Use",
    "capabilities": [
      "vision"
    ],
    "description": "Lightweight multimodal models that run on a single GPU.",
    "run": "ollama run gemma3:4b",
    "url": "https://ollama.com/library/gemma3:4b"
  },
  {
    "name": "Gemma 4 E4B",
    "family": "Gemma 4",
    "creator": "Google",
    "params": "E4B",
    "paramsB": 4,
    "size": "6.6 GB",
    "sizeGB": 6.6,
    "context": "128K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "Google's newest open models with vision, audio, tools and thinking.",
    "run": "ollama run gemma4:e4b",
    "url": "https://ollama.com/library/gemma4:e4b"
  },
  {
    "name": "Gemma 3n E4B",
    "family": "Gemma 3n",
    "creator": "Google",
    "params": "E4B",
    "paramsB": 4,
    "size": "7.5 GB",
    "sizeGB": 7.5,
    "context": "32K",
    "license": "Gemma Terms of Use",
    "capabilities": [],
    "description": "Built for phones and laptops: big-model quality in a small memory footprint.",
    "run": "ollama run gemma3n:e4b",
    "url": "https://ollama.com/library/gemma3n:e4b"
  },
  {
    "name": "StarCoder2 7B",
    "family": "StarCoder2",
    "creator": "BigCode",
    "params": "7B",
    "paramsB": 7,
    "size": "4.0 GB",
    "sizeGB": 4,
    "context": "16K",
    "license": "BigCode OpenRAIL-M",
    "capabilities": [
      "code"
    ],
    "description": "Transparent code models trained on The Stack v2.",
    "run": "ollama run starcoder2:7b",
    "url": "https://ollama.com/library/starcoder2:7b"
  },
  {
    "name": "Granite 4 7B",
    "family": "Granite 4",
    "creator": "IBM",
    "params": "7B (1B active)",
    "paramsB": 7,
    "activeB": 1,
    "size": "4.2 GB",
    "sizeGB": 4.2,
    "context": "1M",
    "license": "Apache 2.0",
    "capabilities": [
      "tools"
    ],
    "description": "Efficient hybrid models built for enterprise and edge.",
    "run": "ollama run granite4:7b-a1b-h",
    "url": "https://ollama.com/library/granite4:7b-a1b-h"
  },
  {
    "name": "Mistral 7B",
    "family": "Mistral",
    "creator": "Mistral AI",
    "params": "7B",
    "paramsB": 7,
    "size": "4.4 GB",
    "sizeGB": 4.4,
    "context": "32K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools"
    ],
    "description": "The classic, efficient 7B model.",
    "run": "ollama run mistral:7b",
    "url": "https://ollama.com/library/mistral:7b"
  },
  {
    "name": "OLMo 2 7B",
    "family": "OLMo 2",
    "creator": "Ai2",
    "params": "7B",
    "paramsB": 7,
    "size": "4.5 GB",
    "sizeGB": 4.5,
    "context": "4K",
    "license": "Apache 2.0",
    "capabilities": [],
    "description": "Fully open models: weights, data and training code.",
    "run": "ollama run olmo2:7b",
    "url": "https://ollama.com/library/olmo2:7b"
  },
  {
    "name": "Falcon 3 7B",
    "family": "Falcon 3",
    "creator": "TII",
    "params": "7B",
    "paramsB": 7,
    "size": "4.6 GB",
    "sizeGB": 4.6,
    "context": "32K",
    "license": "Falcon 3 TII License",
    "capabilities": [],
    "description": "Small, efficient models from the Technology Innovation Institute.",
    "run": "ollama run falcon3:7b",
    "url": "https://ollama.com/library/falcon3:7b"
  },
  {
    "name": "Qwen2.5 Coder 7B",
    "family": "Qwen2.5 Coder",
    "creator": "Alibaba",
    "params": "7B",
    "paramsB": 7,
    "size": "4.7 GB",
    "sizeGB": 4.7,
    "context": "32K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "code"
    ],
    "description": "Code generation, reasoning and fixing in 40+ languages.",
    "run": "ollama run qwen2.5-coder:7b",
    "url": "https://ollama.com/library/qwen2.5-coder:7b"
  },
  {
    "name": "DeepSeek-R1 7B",
    "family": "DeepSeek-R1",
    "creator": "DeepSeek",
    "params": "7B",
    "paramsB": 7,
    "size": "4.7 GB",
    "sizeGB": 4.7,
    "context": "128K",
    "license": "MIT",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "Open reasoning models, from small distills to the full 671B.",
    "run": "ollama run deepseek-r1:7b",
    "url": "https://ollama.com/library/deepseek-r1:7b"
  },
  {
    "name": "Hermes 3 8B",
    "family": "Hermes 3",
    "creator": "Nous Research",
    "params": "8B",
    "paramsB": 8,
    "size": "4.7 GB",
    "sizeGB": 4.7,
    "context": "128K",
    "license": "Llama 3 Community License",
    "capabilities": [
      "tools"
    ],
    "description": "Steerable, role-play friendly fine-tunes of Llama.",
    "run": "ollama run hermes3:8b",
    "url": "https://ollama.com/library/hermes3:8b"
  },
  {
    "name": "Llama 3.1 8B",
    "family": "Llama 3.1",
    "creator": "Meta",
    "params": "8B",
    "paramsB": 8,
    "size": "4.9 GB",
    "sizeGB": 4.9,
    "context": "128K",
    "license": "Llama 3.1 Community License",
    "capabilities": [
      "tools"
    ],
    "description": "Meta's general models with tool calling and 128K context.",
    "run": "ollama run llama3.1:8b",
    "url": "https://ollama.com/library/llama3.1:8b"
  },
  {
    "name": "Cogito 8B",
    "family": "Cogito",
    "creator": "Deep Cogito",
    "params": "8B",
    "paramsB": 8,
    "size": "4.9 GB",
    "sizeGB": 4.9,
    "context": "128K",
    "license": "Llama and Qwen licenses",
    "capabilities": [
      "tools"
    ],
    "description": "Hybrid reasoning models that can answer directly or think first.",
    "run": "ollama run cogito:8b",
    "url": "https://ollama.com/library/cogito:8b"
  },
  {
    "name": "Qwen 3 8B",
    "family": "Qwen 3",
    "creator": "Alibaba",
    "params": "8B",
    "paramsB": 8,
    "size": "5.2 GB",
    "sizeGB": 5.2,
    "context": "40K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "Dense and MoE models with switchable thinking.",
    "run": "ollama run qwen3:8b",
    "url": "https://ollama.com/library/qwen3:8b"
  },
  {
    "name": "DeepSeek-R1 8B",
    "family": "DeepSeek-R1",
    "creator": "DeepSeek",
    "params": "8B",
    "paramsB": 8,
    "size": "5.2 GB",
    "sizeGB": 5.2,
    "context": "128K",
    "license": "MIT",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "Open reasoning models, from small distills to the full 671B.",
    "run": "ollama run deepseek-r1:8b",
    "url": "https://ollama.com/library/deepseek-r1:8b"
  },
  {
    "name": "MiniCPM-V 8B",
    "family": "MiniCPM-V",
    "creator": "OpenBMB",
    "params": "8B",
    "paramsB": 8,
    "size": "5.5 GB",
    "sizeGB": 5.5,
    "context": "32K",
    "license": "MiniCPM Model License",
    "capabilities": [
      "vision"
    ],
    "description": "Efficient vision-language model for images and documents.",
    "run": "ollama run minicpm-v:8b",
    "url": "https://ollama.com/library/minicpm-v:8b"
  },
  {
    "name": "Ministral 3 8B",
    "family": "Ministral 3",
    "creator": "Mistral AI",
    "params": "8B",
    "paramsB": 8,
    "size": "6.0 GB",
    "sizeGB": 6,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "vision"
    ],
    "description": "Edge models with vision and tools.",
    "run": "ollama run ministral-3:8b",
    "url": "https://ollama.com/library/ministral-3:8b"
  },
  {
    "name": "Qwen3 VL 8B",
    "family": "Qwen3 VL",
    "creator": "Alibaba",
    "params": "8B",
    "paramsB": 8,
    "size": "6.1 GB",
    "sizeGB": 6.1,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "Vision-language models for images, documents and video.",
    "run": "ollama run qwen3-vl:8b",
    "url": "https://ollama.com/library/qwen3-vl:8b"
  },
  {
    "name": "Qwen 3.5 9B",
    "family": "Qwen 3.5",
    "creator": "Alibaba",
    "params": "9B",
    "paramsB": 9,
    "size": "6.6 GB",
    "sizeGB": 6.6,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "A full family from tiny to huge, multimodal with thinking.",
    "run": "ollama run qwen3.5:9b",
    "url": "https://ollama.com/library/qwen3.5:9b"
  },
  {
    "name": "Falcon 3 10B",
    "family": "Falcon 3",
    "creator": "TII",
    "params": "10B",
    "paramsB": 10,
    "size": "6.3 GB",
    "sizeGB": 6.3,
    "context": "32K",
    "license": "Falcon 3 TII License",
    "capabilities": [],
    "description": "Small, efficient models from the Technology Innovation Institute.",
    "run": "ollama run falcon3:10b",
    "url": "https://ollama.com/library/falcon3:10b"
  },
  {
    "name": "Llama 3.2 Vision 11B",
    "family": "Llama 3.2 Vision",
    "creator": "Meta",
    "params": "11B",
    "paramsB": 11,
    "size": "7.8 GB",
    "sizeGB": 7.8,
    "context": "128K",
    "license": "Llama 3.2 Community License",
    "capabilities": [
      "vision"
    ],
    "description": "Image reasoning, captioning and visual Q&A.",
    "run": "ollama run llama3.2-vision:11b",
    "url": "https://ollama.com/library/llama3.2-vision:11b"
  },
  {
    "name": "Mistral NeMo 12B",
    "family": "Mistral NeMo",
    "creator": "Mistral AI",
    "params": "12B",
    "paramsB": 12,
    "size": "7.1 GB",
    "sizeGB": 7.1,
    "context": "1000K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools"
    ],
    "description": "A 12B model with 128K context, built with NVIDIA.",
    "run": "ollama run mistral-nemo:12b",
    "url": "https://ollama.com/library/mistral-nemo:12b"
  },
  {
    "name": "Gemma 4 12B",
    "family": "Gemma 4",
    "creator": "Google",
    "params": "12B",
    "paramsB": 12,
    "size": "7.7 GB",
    "sizeGB": 7.7,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "Google's newest open models with vision, audio, tools and thinking.",
    "run": "ollama run gemma4:12b",
    "url": "https://ollama.com/library/gemma4:12b"
  },
  {
    "name": "Gemma 3 12B",
    "family": "Gemma 3",
    "creator": "Google",
    "params": "12B",
    "paramsB": 12,
    "size": "8.2 GB",
    "sizeGB": 8.2,
    "context": "128K",
    "license": "Gemma Terms of Use",
    "capabilities": [
      "vision"
    ],
    "description": "Lightweight multimodal models that run on a single GPU.",
    "run": "ollama run gemma3:12b",
    "url": "https://ollama.com/library/gemma3:12b"
  },
  {
    "name": "OLMo 2 13B",
    "family": "OLMo 2",
    "creator": "Ai2",
    "params": "13B",
    "paramsB": 13,
    "size": "8.4 GB",
    "sizeGB": 8.4,
    "context": "4K",
    "license": "Apache 2.0",
    "capabilities": [],
    "description": "Fully open models: weights, data and training code.",
    "run": "ollama run olmo2:13b",
    "url": "https://ollama.com/library/olmo2:13b"
  },
  {
    "name": "Qwen2.5 Coder 14B",
    "family": "Qwen2.5 Coder",
    "creator": "Alibaba",
    "params": "14B",
    "paramsB": 14,
    "size": "9.0 GB",
    "sizeGB": 9,
    "context": "32K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "code"
    ],
    "description": "Code generation, reasoning and fixing in 40+ languages.",
    "run": "ollama run qwen2.5-coder:14b",
    "url": "https://ollama.com/library/qwen2.5-coder:14b"
  },
  {
    "name": "DeepSeek-R1 14B",
    "family": "DeepSeek-R1",
    "creator": "DeepSeek",
    "params": "14B",
    "paramsB": 14,
    "size": "9.0 GB",
    "sizeGB": 9,
    "context": "128K",
    "license": "MIT",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "Open reasoning models, from small distills to the full 671B.",
    "run": "ollama run deepseek-r1:14b",
    "url": "https://ollama.com/library/deepseek-r1:14b"
  },
  {
    "name": "Cogito 14B",
    "family": "Cogito",
    "creator": "Deep Cogito",
    "params": "14B",
    "paramsB": 14,
    "size": "9.0 GB",
    "sizeGB": 9,
    "context": "128K",
    "license": "Llama and Qwen licenses",
    "capabilities": [
      "tools"
    ],
    "description": "Hybrid reasoning models that can answer directly or think first.",
    "run": "ollama run cogito:14b",
    "url": "https://ollama.com/library/cogito:14b"
  },
  {
    "name": "Phi-4 14B",
    "family": "Phi-4",
    "creator": "Microsoft",
    "params": "14B",
    "paramsB": 14,
    "size": "9.1 GB",
    "sizeGB": 9.1,
    "context": "16K",
    "license": "MIT",
    "capabilities": [],
    "description": "A small model that is strong at reasoning and maths.",
    "run": "ollama run phi4:14b",
    "url": "https://ollama.com/library/phi4:14b"
  },
  {
    "name": "Ministral 3 14B",
    "family": "Ministral 3",
    "creator": "Mistral AI",
    "params": "14B",
    "paramsB": 14,
    "size": "9.1 GB",
    "sizeGB": 9.1,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "vision"
    ],
    "description": "Edge models with vision and tools.",
    "run": "ollama run ministral-3:14b",
    "url": "https://ollama.com/library/ministral-3:14b"
  },
  {
    "name": "Qwen 3 14B",
    "family": "Qwen 3",
    "creator": "Alibaba",
    "params": "14B",
    "paramsB": 14,
    "size": "9.3 GB",
    "sizeGB": 9.3,
    "context": "40K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "Dense and MoE models with switchable thinking.",
    "run": "ollama run qwen3:14b",
    "url": "https://ollama.com/library/qwen3:14b"
  },
  {
    "name": "Phi-4 reasoning 14B",
    "family": "Phi-4 reasoning",
    "creator": "Microsoft",
    "params": "14B",
    "paramsB": 14,
    "size": "11 GB",
    "sizeGB": 11,
    "context": "32K",
    "license": "MIT",
    "capabilities": [],
    "description": "Phi-4 tuned for step-by-step reasoning.",
    "run": "ollama run phi4-reasoning:14b",
    "url": "https://ollama.com/library/phi4-reasoning:14b"
  },
  {
    "name": "StarCoder2 15B",
    "family": "StarCoder2",
    "creator": "BigCode",
    "params": "15B",
    "paramsB": 15,
    "size": "9.1 GB",
    "sizeGB": 9.1,
    "context": "16K",
    "license": "BigCode OpenRAIL-M",
    "capabilities": [
      "code"
    ],
    "description": "Transparent code models trained on The Stack v2.",
    "run": "ollama run starcoder2:15b",
    "url": "https://ollama.com/library/starcoder2:15b"
  },
  {
    "name": "gpt-oss 20B",
    "family": "gpt-oss",
    "creator": "OpenAI",
    "params": "20B (3.6B active)",
    "paramsB": 20,
    "activeB": 3.6,
    "size": "14 GB",
    "sizeGB": 14,
    "context": "128K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "OpenAI's open-weight reasoning models for agents and tools.",
    "run": "ollama run gpt-oss:20b",
    "url": "https://ollama.com/library/gpt-oss:20b"
  },
  {
    "name": "Codestral 22B",
    "family": "Codestral",
    "creator": "Mistral AI",
    "params": "22B",
    "paramsB": 22,
    "size": "13 GB",
    "sizeGB": 13,
    "context": "32K",
    "license": "Mistral Non-Production License",
    "capabilities": [
      "code"
    ],
    "description": "Code completion and generation in 80+ languages.",
    "run": "ollama run codestral:22b",
    "url": "https://ollama.com/library/codestral:22b"
  },
  {
    "name": "Magistral 24B",
    "family": "Magistral",
    "creator": "Mistral AI",
    "params": "24B",
    "paramsB": 24,
    "size": "14 GB",
    "sizeGB": 14,
    "context": "39K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "Mistral's transparent reasoning model.",
    "run": "ollama run magistral:24b",
    "url": "https://ollama.com/library/magistral:24b"
  },
  {
    "name": "Mistral Small 3.2 24B",
    "family": "Mistral Small 3.2",
    "creator": "Mistral AI",
    "params": "24B",
    "paramsB": 24,
    "size": "15 GB",
    "sizeGB": 15,
    "context": "128K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "vision"
    ],
    "description": "Fast 24B model with vision and reliable tool use.",
    "run": "ollama run mistral-small3.2:24b",
    "url": "https://ollama.com/library/mistral-small3.2:24b"
  },
  {
    "name": "Devstral Small 2 24B",
    "family": "Devstral Small 2",
    "creator": "Mistral AI",
    "params": "24B",
    "paramsB": 24,
    "size": "15 GB",
    "sizeGB": 15,
    "context": "384K",
    "license": "See model page",
    "capabilities": [
      "tools",
      "code",
      "vision"
    ],
    "description": "An agentic model for software engineering tasks.",
    "run": "ollama run devstral-small-2:24b",
    "url": "https://ollama.com/library/devstral-small-2:24b"
  },
  {
    "name": "Gemma 4 26B",
    "family": "Gemma 4",
    "creator": "Google",
    "params": "26B (4B active)",
    "paramsB": 26,
    "activeB": 4,
    "size": "16 GB",
    "sizeGB": 16,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "Google's newest open models with vision, audio, tools and thinking.",
    "run": "ollama run gemma4:26b",
    "url": "https://ollama.com/library/gemma4:26b"
  },
  {
    "name": "Gemma 3 27B",
    "family": "Gemma 3",
    "creator": "Google",
    "params": "27B",
    "paramsB": 27,
    "size": "17 GB",
    "sizeGB": 17,
    "context": "128K",
    "license": "Gemma Terms of Use",
    "capabilities": [
      "vision"
    ],
    "description": "Lightweight multimodal models that run on a single GPU.",
    "run": "ollama run gemma3:27b",
    "url": "https://ollama.com/library/gemma3:27b"
  },
  {
    "name": "Qwen 3.5 27B",
    "family": "Qwen 3.5",
    "creator": "Alibaba",
    "params": "27B",
    "paramsB": 27,
    "size": "17 GB",
    "sizeGB": 17,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "A full family from tiny to huge, multimodal with thinking.",
    "run": "ollama run qwen3.5:27b",
    "url": "https://ollama.com/library/qwen3.5:27b"
  },
  {
    "name": "Qwen 3.8 27B",
    "family": "Qwen 3.8",
    "creator": "Alibaba",
    "params": "27B",
    "paramsB": 27,
    "size": "18 GB",
    "sizeGB": 18,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "The latest dense Qwen with vision, tools and thinking.",
    "run": "ollama run qwen3.8:27b",
    "url": "https://ollama.com/library/qwen3.8:27b"
  },
  {
    "name": "Qwen 3.6 27B",
    "family": "Qwen 3.6",
    "creator": "Alibaba",
    "params": "27B",
    "paramsB": 27,
    "size": "18 GB",
    "sizeGB": 18,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "Qwen with strong coding and agent skills, dense and MoE.",
    "run": "ollama run qwen3.6:27b",
    "url": "https://ollama.com/library/qwen3.6:27b"
  },
  {
    "name": "Qwen 3 30B",
    "family": "Qwen 3",
    "creator": "Alibaba",
    "params": "30B (3B active)",
    "paramsB": 30,
    "activeB": 3,
    "size": "19 GB",
    "sizeGB": 19,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "Dense and MoE models with switchable thinking.",
    "run": "ollama run qwen3:30b",
    "url": "https://ollama.com/library/qwen3:30b"
  },
  {
    "name": "Qwen3 Coder 30B",
    "family": "Qwen3 Coder",
    "creator": "Alibaba",
    "params": "30B (3B active)",
    "paramsB": 30,
    "activeB": 3,
    "size": "19 GB",
    "sizeGB": 19,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "code"
    ],
    "description": "Agentic coding models for long, multi-step tasks.",
    "run": "ollama run qwen3-coder:30b",
    "url": "https://ollama.com/library/qwen3-coder:30b"
  },
  {
    "name": "GLM-4.7-Flash 30B",
    "family": "GLM-4.7-Flash",
    "creator": "Z.ai",
    "params": "30B (3B active)",
    "paramsB": 30,
    "activeB": 3,
    "size": "19 GB",
    "sizeGB": 19,
    "context": "198K",
    "license": "MIT",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "A fast, efficient model for coding and agents.",
    "run": "ollama run glm-4.7-flash:latest",
    "url": "https://ollama.com/library/glm-4.7-flash:latest"
  },
  {
    "name": "Qwen3 VL 30B",
    "family": "Qwen3 VL",
    "creator": "Alibaba",
    "params": "30B (3B active)",
    "paramsB": 30,
    "activeB": 3,
    "size": "20 GB",
    "sizeGB": 20,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "Vision-language models for images, documents and video.",
    "run": "ollama run qwen3-vl:30b",
    "url": "https://ollama.com/library/qwen3-vl:30b"
  },
  {
    "name": "Gemma 4 31B",
    "family": "Gemma 4",
    "creator": "Google",
    "params": "31B",
    "paramsB": 31,
    "size": "19 GB",
    "sizeGB": 19,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "Google's newest open models with vision, audio, tools and thinking.",
    "run": "ollama run gemma4:31b",
    "url": "https://ollama.com/library/gemma4:31b"
  },
  {
    "name": "Granite 4 32B",
    "family": "Granite 4",
    "creator": "IBM",
    "params": "32B (9B active)",
    "paramsB": 32,
    "activeB": 9,
    "size": "19 GB",
    "sizeGB": 19,
    "context": "1M",
    "license": "Apache 2.0",
    "capabilities": [
      "tools"
    ],
    "description": "Efficient hybrid models built for enterprise and edge.",
    "run": "ollama run granite4:32b-a9b-h",
    "url": "https://ollama.com/library/granite4:32b-a9b-h"
  },
  {
    "name": "Qwen 3 32B",
    "family": "Qwen 3",
    "creator": "Alibaba",
    "params": "32B",
    "paramsB": 32,
    "size": "20 GB",
    "sizeGB": 20,
    "context": "40K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "Dense and MoE models with switchable thinking.",
    "run": "ollama run qwen3:32b",
    "url": "https://ollama.com/library/qwen3:32b"
  },
  {
    "name": "Qwen2.5 Coder 32B",
    "family": "Qwen2.5 Coder",
    "creator": "Alibaba",
    "params": "32B",
    "paramsB": 32,
    "size": "20 GB",
    "sizeGB": 20,
    "context": "32K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "code"
    ],
    "description": "Code generation, reasoning and fixing in 40+ languages.",
    "run": "ollama run qwen2.5-coder:32b",
    "url": "https://ollama.com/library/qwen2.5-coder:32b"
  },
  {
    "name": "QwQ 32B",
    "family": "QwQ",
    "creator": "Alibaba",
    "params": "32B",
    "paramsB": 32,
    "size": "20 GB",
    "sizeGB": 20,
    "context": "40K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools"
    ],
    "description": "A medium-sized reasoning model that thinks before answering.",
    "run": "ollama run qwq:32b",
    "url": "https://ollama.com/library/qwq:32b"
  },
  {
    "name": "DeepSeek-R1 32B",
    "family": "DeepSeek-R1",
    "creator": "DeepSeek",
    "params": "32B",
    "paramsB": 32,
    "size": "20 GB",
    "sizeGB": 20,
    "context": "128K",
    "license": "MIT",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "Open reasoning models, from small distills to the full 671B.",
    "run": "ollama run deepseek-r1:32b",
    "url": "https://ollama.com/library/deepseek-r1:32b"
  },
  {
    "name": "Cogito 32B",
    "family": "Cogito",
    "creator": "Deep Cogito",
    "params": "32B",
    "paramsB": 32,
    "size": "20 GB",
    "sizeGB": 20,
    "context": "128K",
    "license": "Llama and Qwen licenses",
    "capabilities": [
      "tools"
    ],
    "description": "Hybrid reasoning models that can answer directly or think first.",
    "run": "ollama run cogito:32b",
    "url": "https://ollama.com/library/cogito:32b"
  },
  {
    "name": "Qwen3 VL 32B",
    "family": "Qwen3 VL",
    "creator": "Alibaba",
    "params": "32B",
    "paramsB": 32,
    "size": "21 GB",
    "sizeGB": 21,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "Vision-language models for images, documents and video.",
    "run": "ollama run qwen3-vl:32b",
    "url": "https://ollama.com/library/qwen3-vl:32b"
  },
  {
    "name": "Qwen 3.5 35B",
    "family": "Qwen 3.5",
    "creator": "Alibaba",
    "params": "35B (3B active)",
    "paramsB": 35,
    "activeB": 3,
    "size": "22 GB",
    "sizeGB": 22,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "A full family from tiny to huge, multimodal with thinking.",
    "run": "ollama run qwen3.5:35b",
    "url": "https://ollama.com/library/qwen3.5:35b"
  },
  {
    "name": "Qwen 3.6 35B",
    "family": "Qwen 3.6",
    "creator": "Alibaba",
    "params": "35B (3B active)",
    "paramsB": 35,
    "activeB": 3,
    "size": "23 GB",
    "sizeGB": 23,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "Qwen with strong coding and agent skills, dense and MoE.",
    "run": "ollama run qwen3.6:35b",
    "url": "https://ollama.com/library/qwen3.6:35b"
  },
  {
    "name": "Mixtral 47B",
    "family": "Mixtral",
    "creator": "Mistral AI",
    "params": "47B (13B active)",
    "paramsB": 47,
    "activeB": 13,
    "size": "26 GB",
    "sizeGB": 26,
    "context": "32K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools"
    ],
    "description": "Sparse mixture-of-experts models.",
    "run": "ollama run mixtral:8x7b",
    "url": "https://ollama.com/library/mixtral:8x7b"
  },
  {
    "name": "Hermes 3 70B",
    "family": "Hermes 3",
    "creator": "Nous Research",
    "params": "70B",
    "paramsB": 70,
    "size": "40 GB",
    "sizeGB": 40,
    "context": "128K",
    "license": "Llama 3 Community License",
    "capabilities": [
      "tools"
    ],
    "description": "Steerable, role-play friendly fine-tunes of Llama.",
    "run": "ollama run hermes3:70b",
    "url": "https://ollama.com/library/hermes3:70b"
  },
  {
    "name": "Llama 3.3 70B",
    "family": "Llama 3.3",
    "creator": "Meta",
    "params": "70B",
    "paramsB": 70,
    "size": "43 GB",
    "sizeGB": 43,
    "context": "128K",
    "license": "Llama 3.3 Community License",
    "capabilities": [
      "tools"
    ],
    "description": "70B quality close to Llama 3.1 405B.",
    "run": "ollama run llama3.3:70b",
    "url": "https://ollama.com/library/llama3.3:70b"
  },
  {
    "name": "Llama 3.1 70B",
    "family": "Llama 3.1",
    "creator": "Meta",
    "params": "70B",
    "paramsB": 70,
    "size": "43 GB",
    "sizeGB": 43,
    "context": "128K",
    "license": "Llama 3.1 Community License",
    "capabilities": [
      "tools"
    ],
    "description": "Meta's general models with tool calling and 128K context.",
    "run": "ollama run llama3.1:70b",
    "url": "https://ollama.com/library/llama3.1:70b"
  },
  {
    "name": "DeepSeek-R1 70B",
    "family": "DeepSeek-R1",
    "creator": "DeepSeek",
    "params": "70B",
    "paramsB": 70,
    "size": "43 GB",
    "sizeGB": 43,
    "context": "128K",
    "license": "MIT",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "Open reasoning models, from small distills to the full 671B.",
    "run": "ollama run deepseek-r1:70b",
    "url": "https://ollama.com/library/deepseek-r1:70b"
  },
  {
    "name": "Cogito 70B",
    "family": "Cogito",
    "creator": "Deep Cogito",
    "params": "70B",
    "paramsB": 70,
    "size": "43 GB",
    "sizeGB": 43,
    "context": "128K",
    "license": "Llama and Qwen licenses",
    "capabilities": [
      "tools"
    ],
    "description": "Hybrid reasoning models that can answer directly or think first.",
    "run": "ollama run cogito:70b",
    "url": "https://ollama.com/library/cogito:70b"
  },
  {
    "name": "Llama 3.2 Vision 90B",
    "family": "Llama 3.2 Vision",
    "creator": "Meta",
    "params": "90B",
    "paramsB": 90,
    "size": "55 GB",
    "sizeGB": 55,
    "context": "128K",
    "license": "Llama 3.2 Community License",
    "capabilities": [
      "vision"
    ],
    "description": "Image reasoning, captioning and visual Q&A.",
    "run": "ollama run llama3.2-vision:90b",
    "url": "https://ollama.com/library/llama3.2-vision:90b"
  },
  {
    "name": "Llama 4 109B",
    "family": "Llama 4",
    "creator": "Meta",
    "params": "109B (17B active)",
    "paramsB": 109,
    "activeB": 17,
    "size": "67 GB",
    "sizeGB": 67,
    "context": "10M",
    "license": "Llama 4 Community License",
    "capabilities": [
      "tools",
      "vision"
    ],
    "description": "Natively multimodal mixture-of-experts models.",
    "run": "ollama run llama4:scout",
    "url": "https://ollama.com/library/llama4:scout"
  },
  {
    "name": "gpt-oss 120B",
    "family": "gpt-oss",
    "creator": "OpenAI",
    "params": "120B (5.1B active)",
    "paramsB": 120,
    "activeB": 5.1,
    "size": "65 GB",
    "sizeGB": 65,
    "context": "128K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "OpenAI's open-weight reasoning models for agents and tools.",
    "run": "ollama run gpt-oss:120b",
    "url": "https://ollama.com/library/gpt-oss:120b"
  },
  {
    "name": "Nemotron 3 Super 120B",
    "family": "Nemotron 3 Super",
    "creator": "NVIDIA",
    "params": "120B (12B active)",
    "paramsB": 120,
    "activeB": 12,
    "size": "87 GB",
    "sizeGB": 87,
    "context": "256K",
    "license": "NVIDIA Evaluation License",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "A large hybrid reasoning model for agents.",
    "run": "ollama run nemotron-3-super:120b",
    "url": "https://ollama.com/library/nemotron-3-super:120b"
  },
  {
    "name": "Qwen 3.5 122B",
    "family": "Qwen 3.5",
    "creator": "Alibaba",
    "params": "122B (10B active)",
    "paramsB": 122,
    "activeB": 10,
    "size": "81 GB",
    "sizeGB": 81,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "A full family from tiny to huge, multimodal with thinking.",
    "run": "ollama run qwen3.5:122b",
    "url": "https://ollama.com/library/qwen3.5:122b"
  },
  {
    "name": "Mixtral 141B",
    "family": "Mixtral",
    "creator": "Mistral AI",
    "params": "141B (39B active)",
    "paramsB": 141,
    "activeB": 39,
    "size": "80 GB",
    "sizeGB": 80,
    "context": "64K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools"
    ],
    "description": "Sparse mixture-of-experts models.",
    "run": "ollama run mixtral:8x22b",
    "url": "https://ollama.com/library/mixtral:8x22b"
  },
  {
    "name": "Qwen 3 235B",
    "family": "Qwen 3",
    "creator": "Alibaba",
    "params": "235B (22B active)",
    "paramsB": 235,
    "activeB": 22,
    "size": "142 GB",
    "sizeGB": 142,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "Dense and MoE models with switchable thinking.",
    "run": "ollama run qwen3:235b",
    "url": "https://ollama.com/library/qwen3:235b"
  },
  {
    "name": "Qwen3 VL 235B",
    "family": "Qwen3 VL",
    "creator": "Alibaba",
    "params": "235B (22B active)",
    "paramsB": 235,
    "activeB": 22,
    "size": "143 GB",
    "sizeGB": 143,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "thinking",
      "vision"
    ],
    "description": "Vision-language models for images, documents and video.",
    "run": "ollama run qwen3-vl:235b",
    "url": "https://ollama.com/library/qwen3-vl:235b"
  },
  {
    "name": "Llama 4 400B",
    "family": "Llama 4",
    "creator": "Meta",
    "params": "400B (17B active)",
    "paramsB": 400,
    "activeB": 17,
    "size": "245 GB",
    "sizeGB": 245,
    "context": "1M",
    "license": "Llama 4 Community License",
    "capabilities": [
      "tools",
      "vision"
    ],
    "description": "Natively multimodal mixture-of-experts models.",
    "run": "ollama run llama4:maverick",
    "url": "https://ollama.com/library/llama4:maverick"
  },
  {
    "name": "Hermes 3 405B",
    "family": "Hermes 3",
    "creator": "Nous Research",
    "params": "405B",
    "paramsB": 405,
    "size": "229 GB",
    "sizeGB": 229,
    "context": "128K",
    "license": "Llama 3 Community License",
    "capabilities": [
      "tools"
    ],
    "description": "Steerable, role-play friendly fine-tunes of Llama.",
    "run": "ollama run hermes3:405b",
    "url": "https://ollama.com/library/hermes3:405b"
  },
  {
    "name": "Llama 3.1 405B",
    "family": "Llama 3.1",
    "creator": "Meta",
    "params": "405B",
    "paramsB": 405,
    "size": "243 GB",
    "sizeGB": 243,
    "context": "128K",
    "license": "Llama 3.1 Community License",
    "capabilities": [
      "tools"
    ],
    "description": "Meta's general models with tool calling and 128K context.",
    "run": "ollama run llama3.1:405b",
    "url": "https://ollama.com/library/llama3.1:405b"
  },
  {
    "name": "Qwen3 Coder 480B",
    "family": "Qwen3 Coder",
    "creator": "Alibaba",
    "params": "480B (35B active)",
    "paramsB": 480,
    "activeB": 35,
    "size": "290 GB",
    "sizeGB": 290,
    "context": "256K",
    "license": "Apache 2.0",
    "capabilities": [
      "tools",
      "code"
    ],
    "description": "Agentic coding models for long, multi-step tasks.",
    "run": "ollama run qwen3-coder:480b",
    "url": "https://ollama.com/library/qwen3-coder:480b"
  },
  {
    "name": "DeepSeek-R1 671B",
    "family": "DeepSeek-R1",
    "creator": "DeepSeek",
    "params": "671B (37B active)",
    "paramsB": 671,
    "activeB": 37,
    "size": "404 GB",
    "sizeGB": 404,
    "context": "160K",
    "license": "MIT",
    "capabilities": [
      "tools",
      "thinking"
    ],
    "description": "Open reasoning models, from small distills to the full 671B.",
    "run": "ollama run deepseek-r1:671b",
    "url": "https://ollama.com/library/deepseek-r1:671b"
  },
  {
    "name": "DeepSeek-V3 671B",
    "family": "DeepSeek-V3",
    "creator": "DeepSeek",
    "params": "671B (37B active)",
    "paramsB": 671,
    "activeB": 37,
    "size": "404 GB",
    "sizeGB": 404,
    "context": "160K",
    "license": "DeepSeek License",
    "capabilities": [],
    "description": "A strong general mixture-of-experts model.",
    "run": "ollama run deepseek-v3:671b",
    "url": "https://ollama.com/library/deepseek-v3:671b"
  }
]
