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

const router: IRouter = Router();

router.use(healthRouter);
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

export default router;
