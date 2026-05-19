import { Router, type IRouter } from "express";
import healthRouter from "./health";
import usersRouter from "./users";
import postsRouter from "./posts";
import commentsRouter from "./comments";
import communitiesRouter from "./communities";
import notificationsRouter from "./notifications";
import savedRouter from "./saved";
import searchRouter from "./search";
import trendingRouter from "./trending";
import adminRouter from "./admin";
import storageRouter from "./storage";
import authRouter from "./auth";
import monetizationRouter from "./monetization";
import creatorRouter from "./creator";
import datasetRouter from "./dataset";
import debugRouter from "./debug";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/debug", debugRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/posts", postsRouter);
// Nested comment routes under posts
router.use("/posts/:postId/comments", (req, res, next) => {
  (req as any).params.postId = (req as any).params.postId;
  next();
}, commentsRouter);
// Standalone comment routes (for update/delete/vote by comment id)
router.use("/comments", commentsRouter);
router.use("/communities", communitiesRouter);
router.use("/notifications", notificationsRouter);
router.use("/saved", savedRouter);
router.use("/search", searchRouter);
router.use("/trending", trendingRouter);
router.use("/admin", adminRouter);
router.use("/storage", storageRouter);
router.use("/payments", monetizationRouter);
router.use("/creator", creatorRouter);
router.use("/dataset", datasetRouter);

export default router;
