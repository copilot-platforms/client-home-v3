ALTER TABLE IF EXISTS "settings"
  DROP CONSTRAINT IF EXISTS "settings_banner_image_id_media_id_fk";

ALTER TABLE IF EXISTS "actions"
  DROP CONSTRAINT IF EXISTS "actions_settings_id_settings_id_fk";

DROP INDEX IF EXISTS "idx_settings__workspace_id";
DROP INDEX IF EXISTS "idx_actions__workspace_id";
DROP INDEX IF EXISTS "idx_media__workspace_id";

DROP TABLE IF EXISTS "actions";
DROP TABLE IF EXISTS "settings";
DROP TABLE IF EXISTS "media";