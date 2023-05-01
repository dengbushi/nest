//orm没配置，数据库没有，目前用不了

import 'reflect-metadata';
import { createConnection, getRepository, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import express from 'express';
import bodyParser from 'body-parser';

// 类
@Entity()
class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postId: string | number;

  @Column()
  reporterId: string | number;
}

// API
app.post('/report', async (req, res) => {
  const { postId, reporterId } = req.body;

  // 保存举报信息
  const reportRepository = getRepository(Report);
  const newReport = new Report();
  newReport.postId = postId;
  newReport.reporterId = reporterId;

  await reportRepository.save(newReport);

  res.json({ message: '举报成功' });
});
