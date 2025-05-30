# DataWorks

- [DataWorks](#dataworks)
  - [功能特性](#功能特性)
    - [数据集成](#数据集成)
    - [数据集成功能概述](#数据集成功能概述)
    - [数据集成的实现框架](#数据集成的实现框架)
    - [数据集成流程](#数据集成流程)
    - [数据集成场景](#数据集成场景)

## 功能特性

- 数据集成：全领域数据汇聚
- 数据开发与运维中心：数据加工
- 数据建模：智能数据建模
- 数据分析：即时快速分析
- 数据质量：全流程的质量监控
- 数据地图：统一管理，跟踪血缘
- 数据服务：低成本快速发布API

### 数据集成

### 数据集成功能概述

- 离线同步场景下，支持设置离线同步任务的调度周期
- 实时同步
- 离线和实时的全量、增量同步
- 支持50多种不同异构数据源之间的数据同步
- 支持在各类复杂网络环境下，公网、IDC、VPCX等多种网络环境下的数据同步
- 安全控制与运维监控,保障数据同步的安全可控

### 数据集成的实现框架

- DataX
- Flink CDC

### 数据集成流程

数据来源 + reader + channel + writer + 数据去向

- 配置数据源

### 数据集成场景

- 单表至单表
- 分库分表至单表
- 多表至多表
- 全库全表同步
- 全库排除表同步
- 一次性全量，周期性增量同步
- 周期性全量/增量同步
- 一次性全量/增量同步
- 一次性全量，实时增量同步

